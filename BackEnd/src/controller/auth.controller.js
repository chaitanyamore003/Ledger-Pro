const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sessionModel = require("../models/session.model");
const emailService = require("../services/email.service");

/**
 * - user register controller
 * - POST /api/auth/register
 */
const postRegister = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(422).json({
        success: false,
        message: "Email is Already Registered",
      });
    }

    const user = await userModel.create({
      email,
      name,
      password,
    });

    const session = await sessionModel.create({
      user: user._id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

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

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    session.refreshTokenHash = refreshTokenHash;
    await session.save();

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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          username: user.name,
          email: user.email,
        },
        accessToken,
      },
    });

    emailService.sendRegistrationEmail(user.email, user.name);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * - user login controller
 * - POST /api/auth/login
 */
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is Not Registered",
      });
    }

    // if (!user.verified) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Please verify your email first",
    //   });
    // }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const session = await sessionModel.create({
      user: user._id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

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

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    session.refreshTokenHash = refreshTokenHash;
    await session.save();

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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        user: {
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

module.exports = {
  postRegister,
  postLogin,
  postRefreshToken,
  postLogout,
};
