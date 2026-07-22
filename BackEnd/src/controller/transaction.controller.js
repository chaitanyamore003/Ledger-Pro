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

module.exports = {
  postCreateTransaction,
};
