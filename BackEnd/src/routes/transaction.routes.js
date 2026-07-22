const { Router } = require("express");
const transactionController = require("../controller/transaction.controller");
const authMiddleware = require("../middleware/auth.middleware");

const transactionRouter = Router();

/**
 * POST /api/transactions/
 * Create a new Transaction
 */
transactionRouter.post(
  "/",
  authMiddleware,
  transactionController.postCreateTransaction,
);

module.exports = transactionRouter;
