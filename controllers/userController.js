const { UnAuthorizedError } = require("../error_handlers/customErrors");
const USER = require("../models/userModel");

const REGISTER = async (req, res, next) => {
  try {
    const payload = req.body;
    const newUser = await USER.create(payload);
    return res.status(201).json(newUser);
  } catch (err) {
    console.log("Error : ", err);
    next(err);
  }
};
const LOGIN = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserFound = await USER.findOneByEmail(email);
    if (isUserFound) {
      const isPasswordMatch = await USER.checkPasswordMatch(password)
    } else {
      next(new UnAuthorizedError("Email is not registered or not Active"))
    }
    const newUser = await USER.create(payload);
    return res.status(201).json(newUser);
  } catch (err) {
    console.log("Error : ", err);
    next(err);
  }
};
const GET = async (req, res, next) => {};
const UPDATE = async (req, res, next) => {};

module.exports = { REGISTER, LOGIN };
