const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { saltRounds } = require("../config");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
  },
  { timestamps: true }
);

//Fire a function before document save in DB

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
