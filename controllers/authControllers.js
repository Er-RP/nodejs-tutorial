const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { jwtSecret } = require("../config");
const { jwtTokenMaxAge } = require("../config");

const createToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: jwtTokenMaxAge });
};

module.exports.SIGNUP = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.json({ success: true, data });
  } catch (err) {
    res.json(err);
  }
};

module.exports.LOGIN = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = createToken(user._id);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: jwtTokenMaxAge * 1000,
        });
        res.json({ success: true, user: user._id });
      } else {
        res.json({ msg: "Password doesn't match" });
      }
    } else {
      res.json({ msg: "User not Found" });
    }
  } catch (err) {
    res.json({ msg: "Error occured" });
  }
};

module.exports.SIGNUP_GET = (req, res) => {
  res.send("This is Signup page");
};

module.exports.LOGIN_GET = (req, res) => {
  res.send("This is Login page");
};

module.exports.LOGOUT = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({ msg: "You are logged out successfully" });
};
