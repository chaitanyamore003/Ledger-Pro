const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sessionModel = require("../models/session.model");
const emailService = require("../services/email.service");
const emailVerificationModel = require("../models/emailVerification.model");
const { generateOtp } = require("../utils/otpEmail.util");

/**
 * - User Registration Controller
 * - POST /api/auth/register
 */
const postRegister = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check if email is already registered
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Create unverified user
    const user = await userModel.create({
      email,
      name,
      password,
    });

    // Generate verification OTP
    const otp = generateOtp();

    // Hash OTP before storing
    const otpHash = await bcrypt.hash(otp, 10);

    // Store OTP in verification collection
    const verification = await emailVerificationModel.create({
      user: user._id,
      otpHash,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      purpose: "EMAIL_VERIFICATION",
    });

    try {
      // Send verification email
      await emailService.sendVerificationEmail(user.email, user.name, otp);
    } catch (emailError) {
      // Roll back if email sending fails
      await verification.deleteOne();
      await user.deleteOne();

      return res.status(500).json({
        success: false,
        message: "Unable to send verification email. Please try again.",
      });
    }

    // Registration completed successfully
    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      data: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

/**
 * - User Login Controller
 * - POST /api/auth/login
 */
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include hashed password
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Only verified users are allowed to log in
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Create a new login session
    const session = await sessionModel.create({
      user: user._id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    // Generate refresh token
    const refreshToken = jwt.sign(
      {
        id: user._id,
        sessionId: session._id,
        type: "refresh",
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Store only the hashed refresh token
    session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await session.save();

    // Generate access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        type: "access",
      },
      config.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    // Store refresh token in a secure HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

/**
 * - user logout controller
 * - POST /api/auth/logout
 */
const postLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh Token Not Found",
      });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    if (decoded.type !== "refresh") {
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }

    const session = await sessionModel.findById(decoded.sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session Not Found",
      });
    }

    session.revoked = true;

    await session.save();

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * - rotate tokens controller
 * - POST /api/auth/refreshTokens
 */
const postRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token not found",
      });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    if (decoded.type !== "refresh") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const session = await sessionModel.findById(decoded.sessionId);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.revoked) {
      return res.status(401).json({
        success: false,
        message: "Session revoked",
      });
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash,
    );

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = jwt.sign(
      {
        id: decoded.id,
        type: "access",
      },
      config.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const newRefreshToken = jwt.sign(
      {
        id: decoded.id,
        sessionId: session._id,
        type: "refresh",
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    session.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Access Token Refreshed Successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * - Verify User Email
 * - POST /api/auth/verify-email
 */
const postVerifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Already verified
    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // Find verification record
    const verification = await emailVerificationModel.findOne({
      user: user._id,
      purpose: "EMAIL_VERIFICATION",
    });

    if (!verification) {
      return res.status(404).json({
        success: false,
        message: "Verification request not found.",
      });
    }

    // Check OTP expiry
    if (verification.expiresAt < new Date()) {
      await verification.deleteOne();

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Verify OTP
    const isValidOtp = await bcrypt.compare(otp, verification.otpHash);

    if (!isValidOtp) {
      verification.attempts += 1;
      await verification.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Mark user as verified
    user.verified = true;
    await user.save();

    // Delete OTP after successful verification
    await emailVerificationModel.deleteMany({
      user: user._id,
      purpose: "EMAIL_VERIFICATION",
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

/**
 * - Resend Email OTP
 * - POST /api/auth/resend-otp
 */
const postResendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Email already verified
    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // Check existing verification request
    const verification = await emailVerificationModel.findOne({
      user: user._id,
      purpose: "EMAIL_VERIFICATION",
    });

    // Prevent OTP spam
    if (
      verification &&
      Date.now() - verification.lastSentAt.getTime() < 60 * 1000
    ) {
      return res.status(429).json({
        success: false,
        message: "Please wait at least 1 minute before requesting a new OTP.",
      });
    }

    // Remove previous OTP
    if (verification) {
      await verification.deleteOne();
    }

    // Generate OTP
    const otp = generateOtp();

    // Hash OTP
    const otpHash = await bcrypt.hash(otp, 10);

    // Save verification request
    const newVerification = await emailVerificationModel.create({
      user: user._id,
      otpHash,
      purpose: "EMAIL_VERIFICATION",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      lastSentAt: new Date(),
    });

    try {
      // Send OTP email
      await emailService.sendVerificationEmail(user.email, user.name, otp);
    } catch (emailError) {
      // Roll back verification if email fails
      await newVerification.deleteOne();

      return res.status(500).json({
        success: false,
        message: "Unable to send verification email. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your email.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postRefreshToken,
  postLogout,
  postVerifyEmail,
  postResendOtp,
};
