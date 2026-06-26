const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is is Required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: [true, "Email already Exists"],
    },
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [6, "Password should contain more than 6 character"],
      select: false,
    },
  },
  {
    timeStamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
