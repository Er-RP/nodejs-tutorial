const errorHandler = (error, req, res, next) => {
  // Error handling middleware functionality
  console.log(`${error.name} :  ${error.message}`); // log the error
  const status = error.status || 400;
  // send back an easily understandable error message to the caller
  return res.status(status).send(error.message);
};

module.exports = errorHandler;
