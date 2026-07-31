const express = require("express");
const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes");
const transactionRouter = require("../src/routes/transaction.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

/**
 * Routes
 */
app.use("/api/accounts", accountRouter);
app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);

module.exports = app;
