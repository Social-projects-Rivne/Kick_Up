const { bookshelf } = require('./../config/database');

const Category = bookshelf.Model.extend(
  {
    tableName: 'categories',
  },

);

module.exports = bookshelf.model('Category', Category);