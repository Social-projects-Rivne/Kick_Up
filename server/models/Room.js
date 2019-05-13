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
    rating(){
      return this.hasMany('Rating','entity_id','id').query(qb => {
        qb.where('entity_type',constants.rating.entity_types.room);
      });
    }
  });

module.exports = bookshelf.model('Room', Room);