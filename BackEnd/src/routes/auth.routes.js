const express = require("express");
const authController = require("../controller/auth.controller");

const authRouter = express.Router();

/*POST /api/auth/register */
authRouter.post("/register", authController.postRegister);

/*POST /api/auth/login */
authRouter.post("/login", authController.postLogin);

/*POST /api/auth/logout */
authRouter.post("/logout", authController.postLogout);

/*POST /api/auth/refresh */
authRouter.post("/refresh", authController.postRefreshToken);

/*POST /api/auth/verify-email */
authRouter.post("/verify-email", authController.postVerifyEmail);

/*POST /api/auth/resend-otp */
authRouter.post("/resend-otp", authController.postResendOtp);

module.exports = authRouter;
