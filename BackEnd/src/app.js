const express = require("express");
const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes");
const transactionRouter = require("../src/routes/transaction.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

const allowedOrigins = [
  "http://localhost:5173",
  "https://ledger-pro-eta.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
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
