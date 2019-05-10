const { bookshelf } = require('../config/database');
const constants = require('./../config/constants');
const Event = bookshelf.Model.extend({
    tableName: 'events',
    hidden:['rating'],
    creator() {
        return this.belongsTo('User', 'creator_id');
    },
    category() {
        return this.belongsTo('Category', 'category_id');
    },
    rating(){
        return this.hasMany('Rating','entity_id','id').query(qb => {
            qb.where('entity_type',constants.rating.entity_types.event);
        });
    }
  });

module.exports = bookshelf.model('Event', Event);