require("dotenv").config();
const ENV = process.env;
module.exports = { PORT: ENV.PORT || "5000" };
