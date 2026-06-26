const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sessionModel = require("../models/session.model");

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

    return res.status(201).json({
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
  } catch (error) {
    console.log(error);
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
const postLogin = (req, res) => {};
module.exports = {
  postRegister,
  postLogin,
};
