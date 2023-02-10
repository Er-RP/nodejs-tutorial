const express = require("express");
const { PORT } = require("./config");
const errorHandler = require("./error_handlers/errorHandler");
const { NotFoundError, CustomError } = require("./error_handlers/customErrors");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

// Route with a handler function which throws an error
app.get("/error", (req, res, next) => {
  const error = new CustomError(`processing error in request at ${req.path}`);
  error.statusCode = 400;
  next(error);
});

//Error handler for the not found route.
app.use((req, res, next) => {
  const message = "Request not found";
  const err = new NotFoundError(`${message} for path ${req.path}`);
  next(err);
});

//Error Handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Example app listening on http://localhost:${PORT}`)
);
