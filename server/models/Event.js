const { bookshelf } = require('../config/database');
const Event = bookshelf.Model.extend({
    tableName: 'events',
    creator() {
        return this.belongsTo('User', 'creator_id');
    },
    category() {
        return this.belongsTo('Category', 'category_id');
    },
  });

module.exports = bookshelf.model('Event', Event);