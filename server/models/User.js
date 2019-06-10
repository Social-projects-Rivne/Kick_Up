const { bookshelf } = require('./../config/database');
const { comparePassword, hashPassword } = require('./../services/Bcript');
const moment = require('moment');
const constants = require('./../config/constants');
const User = bookshelf.Model.extend({
    tableName: 'users',
    initialize() {
      this.on('creating', this.hashPassword, this);
    },
    hidden: [
      'password'
    ],
    invited() {
      return this.hasMany('Member')
    },
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
        return this.hasMany('Room').through('Member', 'id', 'user_id', 'entity_id' ).query(qb => {
            qb.select(['rooms.*', 'users.first_name', 'users.last_name', 'users.avatar'])
                .join('users', 'rooms.creator_id', 'users.id')
                .where({entity_type: constants.rating.entity_types.room});
        });
    },
    events() {
        return this.hasMany('Event').through('Member', 'id', 'user_id', 'entity_id' ).query(qb => {
            qb.select(['events.*', 'users.first_name', 'users.last_name', 'users.avatar'])
                .join('users', 'events.creator_id', 'users.id')
                .where({entity_type: constants.rating.entity_types.event});
        });
    },
    publicRooms() {
        return this.hasMany('Room').through('Member', 'id', 'user_id', 'entity_id' ).query(qb => {
            qb.select(['rooms.*', 'users.first_name', 'users.last_name', 'users.avatar'])
                .join('users', 'rooms.creator_id', 'users.id').where({
                    entity_type: constants.rating.entity_types.room,
                    permission: false
                });
        });
    },
    publicEvents() {
        return this.hasMany('Event').through('Member', 'id', 'user_id', 'entity_id' ).query(qb => {
            qb.select(['events.*', 'users.first_name', 'users.last_name', 'users.avatar'])
                .join('users', 'events.creator_id', 'users.id').where({
                    entity_type: constants.rating.entity_types.event,
                    permission: false
                });
        });
    },
    media() {
        return this.hasMany('Media', 'user_id');
    }
  });

module.exports = bookshelf.model('User', User);