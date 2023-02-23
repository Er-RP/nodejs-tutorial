const USER = require("../models/userModel");

const CREATE = async (req, res, next) => {
  try {
    const payload = req.body;
    const newUser = await USER.create(payload);
    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};
const GET = async (req, res, next) => {};
const UPDATE = async (req, res, next) => {};

module.exports = { CREATE };
