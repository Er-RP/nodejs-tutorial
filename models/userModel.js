const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "User email required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  employeeId: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
  },
  isActive: {
    type: Boolean,
  },
});
//virtuals
userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("User", userSchema);
