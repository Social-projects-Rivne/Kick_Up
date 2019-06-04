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
    },
    members() {
        return this.belongsToMany('User', 'members', 'entity_id', 'user_id').query(qb => {
          qb.where('members.entity_type','event');
        });
    },
    media() {
        return this.hasMany('Media', 'entity_id').query(qb => {
          qb.where('media.type','event');
        });
    },
  });

module.exports = bookshelf.model('Event', Event);