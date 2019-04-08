    
module.exports = function ValidationErrors(validationErrors, code = 400){
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = 'Validation errors';
  this.httpCode = code;
  this.validation_errors = validationErrors;
};

require('util').inherits(module.exports, Error);