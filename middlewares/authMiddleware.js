const jwt = require(`jsonwebtoken`);
const { jwtSecret } = require("../config");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log("Token verify Error : ", err);
        return res.json({
          msg: "Please login",
        });
      } else {
        console.log("decodedToken : ", decodedToken);
        next();
      }
    });
  } else {
    return res.json({
      msg: "Please login",
    });
  }
};

module.exports = requireAuth;
