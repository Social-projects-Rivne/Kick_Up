const Validator = require('validatorjs');
const { ValidationError } = require('./errors');

module.exports = (input, rules, messages = []) => new Promise((res, rej) => {
  const validator = new Validator(input, rules, messages);
  validator.passes(res);
  validator.fails(() => {
    rej(new ValidationError(validator.errors));
  });
});