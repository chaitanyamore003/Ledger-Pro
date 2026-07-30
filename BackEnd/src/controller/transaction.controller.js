const transactionModel = require("../models/Transaction.model");
const ledgerModel = require("../models/ledger.model");
const emailSerive = require("../services/email.service");
const accountModel = require("../models/account.model");
const userModel = require("../models/user.model");
const mongoose = require("mongoose");

/**
 * - Create a new transaction
 * The 10 step Transfer Flow
 * - 1.Validate Request
 * - 2.Validate Idempotency key
 * - 3.Check Account Status
 * - 4.Derive Sender Balance from ledger
 * - 5.Create Transcation (PENDING)
 * - 6.Create Debit Ledger Entry
 * - 7.Create Credit Ledger Entry
 * - 8.Mark Transcation Complete
 * - 9.Commit Mongo DB Session
 * - 10. Send Email Notification
 */
const postCreateTransaction = async (req, res, next) => {
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  /** 1. Validate Request */
  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      success: false,
      message: "FromAccount, ToAccount, Amount and IdempotencyKey are required",
    });
  }

  const senderAcc = await accountModel.findById(fromAccount);

  const reciverAcc = await accountModel.findById(toAccount);

  if (!senderAcc || !reciverAcc) {
    return res.status(400).json({
      success: false,
      message: "Invalid FromAccount or ToAccount",
    });
  }

  if (senderAcc === reciverAcc) {
    return res.status(400).json({
      success: false,
      message: "Cannot transfer to the same account",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than zero",
    });
  }
  /** 2. Validate Idempotency Key */
  const isTransactionAlreadyExists = await transactionModel.findOne({
    idempotencyKey: idempotencyKey,
  });

  if (isTransactionAlreadyExists) {
    if (isTransactionAlreadyExists.status === "COMPLETED") {
      return res.status(200).json({
        success: true,
        message: "Transaction already processed",
      });
    } else if (isTransactionAlreadyExists.status === "PENDING") {
      return res.status(200).json({
        success: true,
        message: "Transaction is still processing",
      });
    } else if (isTransactionAlreadyExists.status === "FAILED") {
      return res.status(500).json({
        success: false,
        message: "Transaction Failed, try again",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Transcation Reversed",
      });
    }
  }

  /**
   * 3. check Account status
   */

  if (senderAcc.status != "ACTIVE" || reciverAcc.status != "ACTIVE") {
    return res.status(400).json({
      success: false,
      message:
        "Both SenderAccount and ReciverAccount must be ACTIVE to process transcation",
    });
  }

  /** 4. Derive Sender Balance from ledger */
  const balance = await senderAcc.getBalance();

  if (balance < amount) {
    return res.status(400).json({
      success: false,
      message: `Insufficient balance. Current balance is ${balance}. Requested Amount is ${amount}`,
    });
  }

  /** 5. Create Transcation */
  const session = await mongoose.startSession();
  session.startTransaction();

  const transaction = await transactionModel.create(
    {
      senderAcc,
      reciverAcc,
      amount,
      idempotencyKey,
      status: "PENDING",
    },
    { session },
  );

  /** 6. Create DEBIT ledger Entry */
  const debitLedgerEntry = await ledgerModel.create(
    {
      account: senderAcc,
      amount: amount,
      transaction: transaction._id,
      type: "DEBIT",
    },
    {
      session,
    },
  );

  /** 7. Create CREDIT ledger Entry */
  const creditLedgerEntry = await ledgerModel.create(
    {
      account: reciverAcc,
      amount: amount,
      transaction: transaction._id,
      type: "CREDIT",
    },
    {
      session,
    },
  );

  /** 8. Mark Transcation as Complete */
  transaction.status = "COMPLETED";
  await transaction.save({ session });

  /** 9. Commit Session */
  await session.commitTransaction();
  session.endSession();

  /** 10. Send Email Notification */
  await emailSerive.sendTransactionEmail(
    req.user.email,
    req.user.name,
    amount,
    senderAcc,
    reciverAcc,
  );

  return res.status(200).json({
    success: true,
    message: "transaction completed successfully",
    transaction: transaction,
  });
};

/**
 * - Create Initial Funds
 */
const postCreateInitialFunds = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { toAccount, amount, idempotencyKey } = req.body;

    // Validate request body
    if (!toAccount || amount === undefined || !idempotencyKey) {
      return res.status(400).json({
        success: false,
        message: "toAccount, amount and idempotencyKey are required",
      });
    }

    // Validate amount
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    // Check duplicate request (Idempotency)
    const existingTransaction = await transactionModel.findOne({
      idempotencyKey,
    });

    if (existingTransaction) {
      return res.status(409).json({
        success: false,
        message: "Duplicate transaction request",
        transaction: existingTransaction,
      });
    }

    // Find recipient account
    const toUserAccount = await userModel.findById(toAccount);

    if (!toUserAccount) {
      return res.status(404).json({
        success: false,
        message: "Recipient account not found",
      });
    }

    // Find system account
    const fromUserAccount = await userModel.findOne({
      systemUser: true,
    });

    if (!fromUserAccount) {
      return res.status(404).json({
        success: false,
        message: "System account not found",
      });
    }

    // Prevent self transfer
    if (fromUserAccount._id.equals(toUserAccount._id)) {
      return res.status(400).json({
        success: false,
        message: "Cannot transfer to the same account",
      });
    }

    // Start MongoDB Transaction
    session.startTransaction();

    // Create Transaction
    const [transaction] = await transactionModel.create(
      [
        {
          fromAccount: fromUserAccount._id,
          toAccount: toUserAccount._id,
          amount,
          idempotencyKey,
          status: "PENDING",
        },
      ],
      { session },
    );

    // Debit Entry
    await ledgerModel.create(
      [
        {
          account: fromUserAccount._id,
          amount,
          transaction: transaction._id,
          type: "DEBIT",
        },
      ],
      { session },
    );

    // Credit Entry
    await ledgerModel.create(
      [
        {
          account: toUserAccount._id,
          amount,
          transaction: transaction._id,
          type: "CREDIT",
        },
      ],
      { session },
    );

    // Mark transaction completed
    transaction.status = "COMPLETED";
    await transaction.save({ session });

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Initial funds transferred successfully",
      transaction,
    });
  } catch (error) {
    await session.abortTransaction();

    console.error("Initial Funds Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  postCreateTransaction,
  postCreateInitialFunds,
};
