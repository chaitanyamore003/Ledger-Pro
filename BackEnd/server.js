require("dotenv").config();

const app = require("./src/app");
const config = require("./src/config/config");
const connectToDB = require("./src/config/db");

require("./src/services/email.service");

connectToDB();

app.listen(config.PORT, () => {
  console.log(`Server Running on PORT - http://localhost:${config.PORT}`);
});
