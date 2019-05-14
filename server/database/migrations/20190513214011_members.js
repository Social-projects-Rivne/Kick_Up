
exports.up = async knex => {
    await knex.schema.createTable('members', t => {
      t.increments('id').unsigned().primary();
      t.integer('user_id')
      .index()
      .notNullable()
      .unsigned();
      t.string('entity_type', 36)
      .notNullable()
      .comment('event or room');
      t.integer('entity_id')
      .notNullable()
      .unsigned()
      .comment('event or room id');
      t.foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
    t.timestamp('created_at').nullable().defaultTo(null);
    t.timestamp('updated_at').nullable().defaultTo(null);
    t.collate('utf8_general_ci');
    });
  };
  
  exports.down = async knex => {
    await knex.schema.dropTable('members');
  };