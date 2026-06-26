const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = ["PORT", "MONGO_URL"];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is not defined in Enviroment Variables`);
  }
});

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
};

module.exports = config;
