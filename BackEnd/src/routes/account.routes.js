const express = require("express");
const auth = require("../middleware/auth.middleware");
const accountController = require("../controller/account.controller");

const accountRouter = express.Router();

/**
 * POST api/accounts/
 * Create a new account
 * Protected Route
 */
accountRouter.post(
  "/",
  auth.authMiddleware,
  accountController.postCreateAccount,
);

/**
 * - GET /api/accounts/summary
 * - Dashboard summary for the logged in user
 * - Protected Route
 */
accountRouter.get(
  "/summary",
  auth.authMiddleware,
  accountController.getDashboardSummary,
);

/**
 * - POST /api/accounts/initial-funds
 * - Initialize the logged in user's first funds
 * - Protected Route
 */
accountRouter.post(
  "/initial-funds",
  auth.authMiddleware,
  accountController.postCreateInitialFunds,
);

/**
 * - GET /api/accounts/demo-recipients
 * - Demo recipient account ids for sample transactions
 * - Protected Route
 */
accountRouter.get(
  "/demo-recipients",
  auth.authMiddleware,
  accountController.getDemoRecipientAccounts,
);

/**
 * - GET /api/accounts
 * - Get all accounts of the logged in user
 * - Protected Route
 */
accountRouter.get("/", auth.authMiddleware, accountController.getUserAccounts);

module.exports = accountRouter;
