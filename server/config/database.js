const knexInstance = require('knex');
const bookshelfInstance = require('bookshelf');
require('dotenv').config();

const knexConnectionObject = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  },
  pool: {
    min: 1,
    max: 1
  }
};

const knex = knexInstance(knexConnectionObject);
const bookshelf = bookshelfInstance(knex);

bookshelf.plugin('registry');
bookshelf.plugin('visibility');

module.exports = { bookshelf, knex, knexConnectionObject };