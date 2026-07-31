const nodemailer = require("nodemailer");
const config = require("../config/config");
const {
  generateTransactionHtml,
  generateTransactionText,
} = require("../utils/transactionEmail.util");
const {
  generateTransactionFailureText,
  generateTransactionFailureHtml,
} = require("../utils/transactionFailureEmail.util.js");
const { generateOtpHtml, GenerateOtpText } = require("../utils/otpEmail.util");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify transporter
transporter.verify((error) => {
  if (error) {
    console.error("❌ Failed to connect to Gmail:", error.message);
  } else {
    console.log("✅ Email server is ready.");
  }
});

// Generic email sender
const sendEmail = async (to, subject, text = "", html = "") => {
  try {
    const info = await transporter.sendMail({
      from: `"Ledger Pro" <${config.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`📧 Email sent to ${to}`);
    console.log(`Message ID: ${info.messageId}`);

    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};

//otp Email
const sendVerificationEmail = async (userEmail, name, otp) => {
  const subject = "Email Verification";

  return await sendEmail(
    userEmail,
    subject,
    GenerateOtpText(name, otp),
    generateOtpHtml(name, otp),
  );
};

//transcation Emails

// Transaction successfull Email
const sendTransactionEmail = async (
  userEmail,
  name,
  amount,
  fromAccount,
  toAccount,
  transactionId,
) => {
  const subject = "Transaction Successful";

  return await sendEmail(
    userEmail,
    subject,
    generateTransactionText(
      name,
      amount,
      fromAccount,
      toAccount,
      transactionId,
    ),
    generateTransactionHtml(
      name,
      amount,
      fromAccount,
      toAccount,
      transactionId,
    ),
  );
};

// Transaction unsuccessfull Email
const sendTransactionFailureEmail = async (
  userEmail,
  name,
  amount,
  fromAccount,
  toAccount,
  reason,
) => {
  const subject = "Transaction Failed";

  return await sendEmail(
    userEmail,
    subject,
    generateTransactionFailureText(
      name,
      amount,
      fromAccount,
      toAccount,
      reason,
    ),
    generateTransactionFailureHtml(
      name,
      amount,
      fromAccount,
      toAccount,
      reason,
    ),
  );
};

module.exports = {
  sendVerificationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};
