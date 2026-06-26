const mongoose = require("mongoose");
const config = require("./config");

function connectToDB() {
  mongoose
    .connect(config.MONGO_URL)
    .then(() => {
      console.log("Server connected to MongoDB");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connectToDB;
