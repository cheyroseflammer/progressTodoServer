function asyncErrorBoundary(delegate, defaultStatus) {
  return (request, response, next) => {
    // makes sure the delegate function is called in a promise chain
    Promise.resolve()
      .then(() => delegate(request, response, next))
      // The catch() method will default error to {} in the unlikely event that error is undefined
      .catch((error = {}) => {
        // the error object is destructured to status and message variables
        const { status = defaultStatus, message = error } = error;
        // next() is called, passing in status and message
        next({
          status,
          message,
        });
      });
  };
}
module.exports = asyncErrorBoundary;
