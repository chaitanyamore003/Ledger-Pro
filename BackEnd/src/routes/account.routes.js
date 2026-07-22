const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controller/account.controller");

const accountRouter = express.Router();

/**
 * POST api/accounts/
 * Create a new account
 * Protected Route
 */
accountRouter.post("/", authMiddleware, accountController.postCreateAccount);

module.exports = accountRouter;
