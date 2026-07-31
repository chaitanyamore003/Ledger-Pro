const mongoose = require("mongoose");
const transactionModel = require("../models/Transaction.model");
const ledgerModel = require("../models/ledger.model");
const emailService = require("../services/email.service");
const accountModel = require("../models/account.model");

const getAccountId = (account) =>
  account?._id?.toString() || account?.toString();

const mapTransaction = (transaction, accountIds) => {
  const fromAccountId = getAccountId(transaction.fromAccount);
  const toAccountId = getAccountId(transaction.toAccount);
  const isCredit = accountIds.has(toAccountId);
  const isInitialFunds =
    transaction.idempotencyKey?.startsWith("initial-funds");
  let title = isCredit ? "Incoming Transfer" : "Outgoing Transfer";

  if (isInitialFunds) {
    title = "Initial Funds";
  }

  return {
    id: transaction._id,
    reference: `TRX-${transaction._id.toString().slice(-6).toUpperCase()}`,
    title,
    account: "Primary Account",
    amount: transaction.amount,
    type: isCredit ? "credit" : "debit",
    status: transaction.status,
    date: transaction.createdAt,
    fromAccount: fromAccountId,
    toAccount: toAccountId,
  };
};

const getOrCreatePrimaryAccount = async (userId) => {
  const existingAccount = await accountModel.findOne({ user: userId });

  if (existingAccount) {
    return existingAccount;
  }

  return accountModel.create({ user: userId });
};

/**
 * - Create a new transaction
 */
const postCreateTransaction = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;
    const numericAmount = Number(amount);

    if (!fromAccount || !toAccount || amount === undefined || !idempotencyKey) {
      return res.status(400).json({
        success: false,
        message:
          "fromAccount, toAccount, amount and idempotencyKey are required",
      });
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(fromAccount) ||
      !mongoose.Types.ObjectId.isValid(toAccount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid fromAccount or toAccount",
      });
    }

    const senderAcc = await accountModel.findOne({
      _id: fromAccount,
      user: req.user._id,
    });

    const receiverAcc = await accountModel.findById(toAccount);

    const balance = await senderAcc.getBalance();

    session.startTransaction();
    console.log("5. Transaction started");

    const [transaction] = await transactionModel.create(
      [
        {
          fromAccount: senderAcc._id,
          toAccount: receiverAcc._id,
          amount: numericAmount,
          idempotencyKey,
          status: "PENDING",
        },
      ],
      { session },
    );

    await ledgerModel.insertMany(
      [
        {
          account: senderAcc._id,
          amount: numericAmount,
          transaction: transaction._id,
          type: "DEBIT",
        },
        {
          account: receiverAcc._id,
          amount: numericAmount,
          transaction: transaction._id,
          type: "CREDIT",
        },
      ],
      {
        session,
        ordered: true,
      },
    );

    transaction.status = "COMPLETED";
    await transaction.save({ session });

    await session.commitTransaction();

    try {
      await emailService.sendTransactionEmail(
        req.user.email,
        req.user.name,
        numericAmount,
        senderAcc._id,
        receiverAcc._id,
        transaction._id,
      );
    } catch (emailError) {
      console.error("Transaction email failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "transaction completed successfully",
      data: transaction,
      transaction,
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
    });
  } finally {
    await session.endSession();
  }
};

const getUserTransactions = async (req, res) => {
  try {
    await getOrCreatePrimaryAccount(req.user._id);

    const accounts = await accountModel.find({ user: req.user._id });
    const accountIds = accounts.map((account) => account._id);
    const accountIdSet = new Set(accountIds.map((id) => id.toString()));

    const transactions = await transactionModel
      .find({
        $or: [
          { fromAccount: { $in: accountIds } },
          { toAccount: { $in: accountIds } },
        ],
      })
      .sort({ createdAt: -1 })
      .populate("fromAccount", "user currency")
      .populate("toAccount", "user currency");

    return res.status(200).json({
      success: true,
      message: "transactions fetched successfully",
      data: transactions.map((transaction) =>
        mapTransaction(transaction, accountIdSet),
      ),
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};

/**
 * - Legacy system route for creating initial funds.
 * - The user-facing route lives at POST /api/accounts/initial-funds.
 */
const postCreateInitialFunds = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { toAccount, amount, idempotencyKey } = req.body;
    const numericAmount = Number(amount);

    if (!toAccount || amount === undefined || !idempotencyKey) {
      return res.status(400).json({
        success: false,
        message: "toAccount, amount and idempotencyKey are required",
      });
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(toAccount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid recipient account",
      });
    }

    const fromAccount = await getOrCreatePrimaryAccount(req.user._id);
    const recipientAccount = await accountModel.findById(toAccount);

    if (!recipientAccount) {
      return res.status(404).json({
        success: false,
        message: "Recipient account not found",
      });
    }

    const existingTransaction = await transactionModel.findOne({
      idempotencyKey,
    });

    if (existingTransaction) {
      const belongsToRequest =
        existingTransaction.fromAccount.equals(fromAccount._id) &&
        existingTransaction.toAccount.equals(recipientAccount._id);

      if (!belongsToRequest) {
        return res.status(409).json({
          success: false,
          message: "Duplicate idempotency key",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Initial funds already processed",
        data: existingTransaction,
        transaction: existingTransaction,
      });
    }

    session.startTransaction();

    const [transaction] = await transactionModel.create(
      [
        {
          fromAccount: fromAccount._id,
          toAccount: recipientAccount._id,
          amount: numericAmount,
          idempotencyKey,
          status: "PENDING",
        },
      ],
      { session },
    );

    await ledgerModel.create(
      [
        {
          account: fromAccount._id,
          amount: numericAmount,
          transaction: transaction._id,
          type: "DEBIT",
        },
        {
          account: recipientAccount._id,
          amount: numericAmount,
          transaction: transaction._id,
          type: "CREDIT",
        },
      ],
      { session },
    );

    transaction.status = "COMPLETED";
    await transaction.save({ session });

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Initial funds transferred successfully",
      data: transaction,
      transaction,
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

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
  getUserTransactions,
  postCreateInitialFunds,
};
