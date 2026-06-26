const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * - user register controller
 * - POST /api/auth/register
 */
const postRegister = async (req, res) => {
  const { email, name, password } = req.body;

  const Exists = await userModel.findOne({ email });

  if (Exists) {
    return res.status(422).json({
      message: "Email is Already Registered",
      status: "failed",
    });
  }

  const hash = bcrypt.hash(password, 10);
  const user = userModel.create({
    email,
    name,
    password: hash,
  });

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
};

const postLogin = (req, res) => {};
module.exports = {
  postRegister,
  postLogin,
};
