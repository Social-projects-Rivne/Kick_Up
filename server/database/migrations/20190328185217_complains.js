
exports.up = async knex => {
  await knex.schema.createTable('complains', t => {
    t.increments('id').unsigned().primary();
    t.integer('user_id')
    .index()
    .notNullable()
    .unsigned();
    t.string('entity_type', 36)
    .notNullable()
    .comment('event or room');
    t.string('text')
    .notNullable();
    t.integer('entity_id')
    .notNullable()
    .unsigned()
    .comment('event or room id');
    t.boolean('resolved').defaultTo(false);
    t.foreign('user_id')
    .references('users.id')
    .onDelete('CASCADE');
  t.timestamp('created_at').nullable().defaultTo(null);
  t.timestamp('updated_at').nullable().defaultTo(null);
  t.collate('utf8_general_ci');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('complains');
};