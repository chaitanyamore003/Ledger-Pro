const accountModel = require("../models/account.model");

const postCreateAccount = async (req, res) => {
  try {
    const existingAccount = await accountModel.findOne({
      user: req.user._id,
    });

    if (existingAccount) {
      return res.status(409).json({
        success: false,
        message: "Account already exists",
      });
    }

    const account = await accountModel.create({
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create account",
    });
  }
};

const getUserAccounts = async (req, res) => {
  const accounts = await accountModel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    message: "accounts fetched successfully",
    accounts,
  });
};

module.exports = {
  postCreateAccount,
  getUserAccounts,
};
