const mongoose = require("mongoose");

const emailVerificationSchema = new mongoose.Schema(
  {
    // Associated user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User is required"],
      index: true,
    },

    // Hashed OTP
    otpHash: {
      type: String,
      required: [true, "OTP hash is required"],
    },

    // OTP purpose
    purpose: {
      type: String,
      enum: [
        "EMAIL_VERIFICATION",
        "PASSWORD_RESET",
        "EMAIL_CHANGE",
        "LOGIN_VERIFICATION",
      ],
      default: "EMAIL_VERIFICATION",
    },

    // Maximum verification attempts
    attempts: {
      type: Number,
      default: 0,
    },

    // Last resend timestamp
    lastSentAt: {
      type: Date,
      default: Date.now,
    },

    // OTP expiration (MongoDB TTL)
    expiresAt: {
      type: Date,
      required: true,
      index: {
        expires: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

const emailVerificationModel = mongoose.model(
  "email_verifications",
  emailVerificationSchema,
);

module.exports = emailVerificationModel;
