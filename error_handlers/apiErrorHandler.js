const { ValidationError } = require("./customErrors");

const apiErrorHandler = (err, req, res, next) => {
  if (err?.name === "ValidationError") {
    const { statusCode, name } = new ValidationError(err?.message);
    return res.status(statusCode).json({
      error: {
        name,
        message: err?.message,
      },
    });
  }
  next(err);
};

module.exports = apiErrorHandler;
