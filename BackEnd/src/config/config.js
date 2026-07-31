const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = [
  "MONGO_URL",
  "JWT_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_USER",
  "GOOGLE_REFRESH_TOKEN",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is not defined in Enviroment Variables`);
  }
});

const config = {
  PORT: process.env.PORT || 3001,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_USER: process.env.GOOGLE_USER,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
};

module.exports = config;
