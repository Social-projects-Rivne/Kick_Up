const { bookshelf } = require('./../config/database');

const Media = bookshelf.Model.extend(
  {
    tableName: 'media',
  },

);

module.exports = bookshelf.model('Media', Media);