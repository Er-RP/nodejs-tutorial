const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  employeeId: {
    type: String,
  },
  roles: {
    type: [String],
  },
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
