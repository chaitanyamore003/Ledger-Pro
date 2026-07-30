const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid Access token",
      });
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const authSystemMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Token Missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    const user = await userModel.findById(decoded.id).select("+systemUser");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.systemUser) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access, not a system user",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  authMiddleware,
  authSystemMiddleware,
};
