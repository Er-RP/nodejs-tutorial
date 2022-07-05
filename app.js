const express = require("express");
const Logger = require("./src/utils/Logger");
const morganMiddleware = require("./src/middlewares/morganMiddleware");

const app = express();
const PORT = 5000;

app.use(morganMiddleware);

app.get("/logger", (req, res) => {
  Logger.error("This is an error log");
  Logger.warn("This is a warn log");
  Logger.info("This is a info log");
  Logger.http("This is a http log");
  Logger.debug("This is a debug log");

  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is up and running @ http://localhost:${PORT}`);
});
