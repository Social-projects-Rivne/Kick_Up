const { bookshelf } = require('./../config/database');
const { comparePassword,hashPassword } = require('./../services/Bcript')

const User = bookshelf.Model.extend({
    tableName: 'users',
    initialize() {
      this.on('creating', this.hashPassword, this);
    },
    hidden: [
      'password'
    ],
    comparePassword(plainPassword) {
      return comparePassword(plainPassword, this.get('password'));
    },
    async hashPassword(model) {
      const hash = await hashPassword(model.attributes.password);
      const email = model.get('email').toLowerCase();
      model.set('email', email);
      model.set('password', hash);
    },
  });

module.exports = User;