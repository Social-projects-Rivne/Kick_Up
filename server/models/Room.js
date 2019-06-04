const { bookshelf } = require('../config/database');
const constants = require('./../config/constants');
const Room = bookshelf.Model.extend({
    tableName: 'rooms',
    hidden:['rating'],
    creator() {
      return this.belongsTo('User', 'creator_id');
    },
    category() {
        return this.belongsTo('Category', 'category_id');
    },
    event() {
        return this.hasMany('Event');
    },
    members() {
      return this.belongsToMany('User', 'members', 'entity_id', 'user_id').query(qb => {
        qb.where('members.entity_type','room');
      });
    },
    rating(){
      return this.hasMany('Rating','entity_id','id').query(qb => {
        qb.where('entity_type',constants.rating.entity_types.room);
      });
    },
    media() {
      return this.hasMany('Media', 'entity_id').query(qb => {
        qb.where('media.type','room');
      });
    },
  });

module.exports = bookshelf.model('Room', Room);