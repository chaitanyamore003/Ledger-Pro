const nodemailer = require("nodemailer");
const config = require("../config/config");
const {
  RegistrationText,
  generateRegistrationHtml,
} = require("../utils/registrationEmail.util");
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
      from: `"LedgerFlow" <${config.GOOGLE_USER}>`,
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

// Registration Email
const sendRegistrationEmail = async (userEmail, name) => {
  const subject = "🎉 Welcome to LedgerFlow";
  return await sendEmail(
    userEmail,
    subject,
    RegistrationText(name),
    generateRegistrationHtml(name),
  );
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

module.exports = {
  sendEmail,
  sendRegistrationEmail,
  sendVerificationEmail,
};
