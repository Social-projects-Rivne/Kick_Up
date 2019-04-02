const bcrypt = require('bcrypt-nodejs');
const util = require('util');

const genSalt = util.promisify(bcrypt.genSalt);
const compare = util.promisify(bcrypt.compare);
const hash = util.promisify(bcrypt.hash);

module.exports = {
  hashPassword: async plainPassword => {
    const salt = await genSalt(8);
    return hash(plainPassword, salt, null);
  },
  comparePassword: (plainPassword, hashedUserPassword) => compare(plainPassword, hashedUserPassword)
};
