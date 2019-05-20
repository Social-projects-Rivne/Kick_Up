const JWTService = require('./JWTService');
const validate = require('./Validator');
const uploader = require('./Uploader');
const Mailer = require('./Mailer');

module.exports = {
  JWTService,
  validate,
  uploader,
  Mailer
};