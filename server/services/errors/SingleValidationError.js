module.exports = function SingleValidationError(message, code = 400) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.httpCode = code;
};

require('util').inherits(module.exports, Error);