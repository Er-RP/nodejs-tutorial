class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message || "Not found", 404);
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(message || "Bad request", 400);
  }
}

module.exports = { BadRequestError, NotFoundError, CustomError };
