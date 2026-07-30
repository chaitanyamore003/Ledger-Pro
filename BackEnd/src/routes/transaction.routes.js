const { Router } = require("express");
const transactionController = require("../controller/transaction.controller");
const auth = require("../middleware/auth.middleware");

const transactionRouter = Router();

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
 * POST /api/transactions/system/initail-funds
 * Create initial funds transaction from system user
 */
transactionRouter.post("/system/initial-funds", auth.authSystemMiddleware, transactionController.postCreateInitialFunds);

module.exports = transactionRouter;
