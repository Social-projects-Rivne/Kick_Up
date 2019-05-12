
exports.up = async knex => {
  await knex.schema.createTable('categories', t => {
    t.increments('id').unsigned().primary();
    t.string('title').nullable();
    t.collate('utf8_general_ci');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('categories');
};