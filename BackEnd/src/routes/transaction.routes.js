const { Router } = require("express");
const transactionController = require("../controller/transaction.controller");
const auth = require("../middleware/auth.middleware");

const transactionRouter = Router();

/**
 * GET /api/transactions/
 * Get logged in user's transactions
 */
transactionRouter.get(
  "/",
  auth.authMiddleware,
  transactionController.getUserTransactions,
);

/**
 * POST /api/transactions/
 * Create a new Transaction
 */
transactionRouter.post(
  "/",
  auth.authMiddleware,
  transactionController.postCreateTransaction,
);

/**
 * POST /api/transactions/system/initial-funds
 * Create initial funds transaction from system user
 */
transactionRouter.post(
  "/system/initial-funds",
  auth.authSystemMiddleware,
  transactionController.postCreateInitialFunds,
);

module.exports = transactionRouter;
