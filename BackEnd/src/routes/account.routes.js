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
 * - GET /api/accounts
 * - Get all accounts of the logged in user
 * - Protected Route
 */
accountRouter.get("/", auth.authMiddleware, accountController.getUserAccounts);

module.exports = accountRouter;
