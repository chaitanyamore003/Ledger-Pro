const crypto = require("crypto");
const mongoose = require("mongoose");
const accountModel = require("../models/account.model");
const ledgerModel = require("../models/ledger.model");
const transactionModel = require("../models/Transaction.model");
const userModel = require("../models/user.model");

const SYSTEM_USER_EMAIL = "system@ledgerpro.com";
const DEMO_RECIPIENTS = [
  {
    email: "demo.recipient.one@ledgerpro.com",
    name: "Demo Recipient One",
    label: "Demo Recipient 1",
  },
  {
    email: "demo.recipient.two@ledgerpro.com",
    name: "Demo Recipient Two",
    label: "Demo Recipient 2",
  },
];

const getAccountId = (account) =>
  account?._id?.toString() || account?.toString();

const formatAccount = async (account) => {
  const balance = await account.getBalance();

  return {
    ...account.toObject(),
    name: "Primary Account",
    balance,
  };
};

const getOrCreatePrimaryAccount = async (userId) => {
  const existingAccount = await accountModel.findOne({ user: userId });

  if (existingAccount) {
    return existingAccount;
  }

  return accountModel.create({ user: userId });
};

const getOrCreateSystemAccount = async () => {
  let systemUser = await userModel
    .findOne({ systemUser: true })
    .select("+systemUser");

  if (!systemUser) {
    systemUser = await userModel
      .findOne({ email: SYSTEM_USER_EMAIL })
      .select("+systemUser");
  }

  if (!systemUser || !systemUser.systemUser) {
    const email = systemUser
      ? `system-${Date.now()}@ledgerpro.com`
      : SYSTEM_USER_EMAIL;

    systemUser = await userModel.create({
      email,
      name: "Ledger Pro System",
      password: crypto.randomUUID(),
      systemUser: true,
      verified: true,
    });
  }

  return getOrCreatePrimaryAccount(systemUser._id);
};

const getOrCreateDemoRecipients = async () => {
  return Promise.all(
    DEMO_RECIPIENTS.map(async (recipient) => {
      let user = await userModel.findOne({ email: recipient.email });

      if (!user) {
        user = await userModel.create({
          email: recipient.email,
          name: recipient.name,
          password: crypto.randomUUID(),
          verified: true,
        });
      }

      const account = await getOrCreatePrimaryAccount(user._id);

      return {
        label: recipient.label,
        name: user.name,
        email: user.email,
        accountId: account._id,
        currency: account.currency,
        status: account.status,
      };
    }),
  );
};

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

const buildDashboardSummary = async (userId) => {
  await getOrCreatePrimaryAccount(userId);

  const accounts = await accountModel.find({ user: userId });
  const accountIds = accounts.map((account) => account._id);
  const accountIdSet = new Set(accountIds.map((id) => id.toString()));
  const balances = await Promise.all(
    accounts.map((account) => account.getBalance()),
  );
  const currentBalance = balances.reduce((total, value) => total + value, 0);

  const transactionQuery = {
    $or: [
      { fromAccount: { $in: accountIds } },
      { toAccount: { $in: accountIds } },
    ],
  };

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [totalTransactions, monthlyTransactions, recentTransactions] =
    await Promise.all([
      transactionModel.countDocuments(transactionQuery),
      transactionModel.countDocuments({
        ...transactionQuery,
        createdAt: { $gte: startOfMonth },
      }),
      transactionModel
        .find(transactionQuery)
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("fromAccount", "user currency")
        .populate("toAccount", "user currency"),
    ]);

  return {
    currentBalance,
    totalAccounts: accounts.length,
    totalTransactions,
    monthlyTransactions,
    primaryAccountId: accounts[0]?._id,
    canInitializeFunds: totalTransactions === 0 && currentBalance === 0,
    recentTransactions: recentTransactions.map((transaction) =>
      mapTransaction(transaction, accountIdSet),
    ),
  };
};

const postCreateAccount = async (req, res) => {
  try {
    const existingAccount = await accountModel.findOne({
      user: req.user._id,
    });

    if (existingAccount) {
      const account = await formatAccount(existingAccount);

      return res.status(200).json({
        success: true,
        message: "Account already exists",
        data: account,
      });
    }

    const account = await accountModel.create({
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: await formatAccount(account),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create account",
    });
  }
};

const getUserAccounts = async (req, res) => {
  try {
    await getOrCreatePrimaryAccount(req.user._id);

    const accounts = await accountModel.find({ user: req.user._id });
    const accountsWithBalance = await Promise.all(accounts.map(formatAccount));

    res.status(200).json({
      success: true,
      message: "accounts fetched successfully",
      data: accountsWithBalance,
      accounts: accountsWithBalance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch accounts",
    });
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    const dashboard = await buildDashboardSummary(req.user._id);

    res.status(200).json({
      success: true,
      message: "dashboard summary fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
    });
  }
};

const getDemoRecipientAccounts = async (req, res) => {
  try {
    const recipients = await getOrCreateDemoRecipients();
    const currentUserAccount = await getOrCreatePrimaryAccount(req.user._id);
    const demoRecipients = recipients.filter(
      (recipient) => !recipient.accountId.equals(currentUserAccount._id),
    );

    res.status(200).json({
      success: true,
      message: "demo recipient accounts fetched successfully",
      data: demoRecipients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch demo recipient accounts",
    });
  }
};

const postCreateInitialFunds = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { amount, idempotencyKey } = req.body;
    const numericAmount = Number(amount);

    if (!idempotencyKey) {
      return res.status(400).json({
        success: false,
        message: "idempotencyKey is required",
      });
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    const toAccount = await getOrCreatePrimaryAccount(req.user._id);
    const existingTransaction = await transactionModel.findOne({
      idempotencyKey,
    });

    if (existingTransaction) {
      const belongsToUser =
        existingTransaction.fromAccount.equals(toAccount._id) ||
        existingTransaction.toAccount.equals(toAccount._id);

      if (!belongsToUser) {
        return res.status(409).json({
          success: false,
          message: "Duplicate idempotency key",
        });
      }

      const dashboard = await buildDashboardSummary(req.user._id);

      return res.status(200).json({
        success: true,
        message: "Initial funds already processed",
        data: {
          transaction: existingTransaction,
          dashboard,
        },
      });
    }

    const completedTransactions = await transactionModel.countDocuments({
      status: "COMPLETED",
      $or: [{ fromAccount: toAccount._id }, { toAccount: toAccount._id }],
    });
    const currentBalance = await toAccount.getBalance();

    if (completedTransactions > 0 || currentBalance !== 0) {
      return res.status(409).json({
        success: false,
        message: "Initial funds can only be added before transactions start",
      });
    }

    const fromAccount = await getOrCreateSystemAccount();

    session.startTransaction();

    const [transaction] = await transactionModel.create(
      [
        {
          fromAccount: fromAccount._id,
          toAccount: toAccount._id,
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
          account: fromAccount._id,
          amount: numericAmount,
          transaction: transaction._id,
          type: "DEBIT",
        },
        {
          account: toAccount._id,
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

    const dashboard = await buildDashboardSummary(req.user._id);

    return res.status(201).json({
      success: true,
      message: "Initial funds transferred successfully",
      data: {
        transaction,
        dashboard,
      },
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
  postCreateAccount,
  getUserAccounts,
  getDashboardSummary,
  getDemoRecipientAccounts,
  postCreateInitialFunds,
  buildDashboardSummary,
};
