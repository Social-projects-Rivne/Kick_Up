const { bookshelf } = require('../config/database');
const Room = bookshelf.Model.extend({
    tableName: 'rooms',
    creator() {
      return this.belongsTo('User', 'creator_id');
    },
    category() {
        return this.belongsTo('Category', 'category_id');
    },
  });

module.exports = bookshelf.model('Room', Room);