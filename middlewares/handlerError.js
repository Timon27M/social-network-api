const handlerError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let errorMessage;
  if (statusCode === 500) {
    errorMessage = err.message;
  } else {
    errorMessage = err.message;
  }
  res.status(statusCode).send({
    message: errorMessage,
  });
  next();
};

module.exports = handlerError;
