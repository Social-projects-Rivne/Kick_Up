
exports.up = async knex => {
  await knex.schema.createTable('complains', t => {
    t.increments('id').unsigned().primary();
    t.integer('user_id').unsigned();
    t.string('text').nullable();
    t.integer('status').nullable();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('complains');
};