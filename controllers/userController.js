const USER = require("../models/userModel");

const CREATE = async (req, res, next) => {
  try {
    const payload = req.body;
    console.log("User Payload :", JSON.stringify(payload));
    const newUser = await USER.create(payload);
    return res.json(newUser);
  } catch (err) {
    console.error(err);
  }
};
const GET = async (req, res, next) => {};
const UPDATE = async (req, res, next) => {};

module.exports = { CREATE };
