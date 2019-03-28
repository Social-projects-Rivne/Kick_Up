
exports.up = async knex => {
  await knex.schema.createTable('social_links', t => {
    t.increments('id').unsigned().primary();
    t.integer('user_id').unsigned();
    t.string('link').nullable();
    t.string('link_type').nullable();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('social_links');
};