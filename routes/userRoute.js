const express = require("express");
const { CREATE } = require("../controllers/userController");
const { CustomError } = require("../error_handlers/customErrors");
const USER = require("../models/userModel");

const router = express.Router();

const existingUser = async (req, res, next) => {
  try {
    const user = await USER.findOne({ email: req?.body?.email });
    if (user) next(new CustomError("Email already exists", 409));
    else next();
  } catch (error) {
    next(error);
  }
};
router.post("", existingUser, CREATE);

module.exports = router;
