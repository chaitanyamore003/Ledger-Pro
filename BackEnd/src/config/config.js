const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = ["PORT", "MONGO_URL", "JWT_SECRET"];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is not defined in Enviroment Variables`);
  }
});

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
