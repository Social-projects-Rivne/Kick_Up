const { bookshelf } = require('./../config/database');

const Rating = bookshelf.Model.extend(
  {
    tableName: 'ratings',
  }
);

module.exports = bookshelf.model('Rating', Rating);