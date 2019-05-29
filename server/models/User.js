const { bookshelf } = require('./../config/database');
const { comparePassword, hashPassword } = require('./../services/Bcript')
const moment = require('moment');
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
      model.set('created_at', moment().format('YYYY-MM-DD h:mm:ss'));
    },
    rooms() {
        return this.hasMany('Room', 'creator_id', 'id');
    },
    events() {
        return this.hasMany('Event', 'creator_id', 'id');
    },
    publicRooms() {
        return this.hasMany('Room', 'creator_id', 'id').query(qb => {
            qb.where({permission: false});
        });
    },
    publicEvents() {
        return this.hasMany('Event', 'creator_id', 'id').query(qb => {
            qb.where({permission: false});
        });
    }
  });

module.exports = bookshelf.model('User', User);