const { bookshelf } = require('./../config/database');

const Tag = bookshelf.Model.extend(
  {
    tableName: 'tags',
  },

);

module.exports = bookshelf.model('Tag', Tag);