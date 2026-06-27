const express = require("express");
const authController = require("../controller/auth.controller");

const authRouter = express.Router();

/*POST /api/auth/register */
authRouter.post("/register", authController.postRegister);

/*POST /api/auth/login */
authRouter.post("/login", authController.postLogin);

/*POST /api/auth/refresh */
authRouter.post("/refresh", authController.postRefreshToken);

module.exports = authRouter;
