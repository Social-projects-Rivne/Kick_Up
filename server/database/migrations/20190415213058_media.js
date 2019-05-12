exports.up = async knex => {
    await knex.schema.createTable('media', t => {
      t.increments();
      t.integer('user_id')
        .index()
        .nullable()
        .unsigned();
      t.string('key', 100)
        .notNullable()
        .unique();
      t.string('type', 36)
        .nullable()
        .comment('Type, room, event');
      t.integer('entity_id')
        .notNullable()
        .comment('room_id, event_id');
      t.foreign('user_id')
        .references('users.id')
        .onDelete('SET NULL');
      t.timestamp('created_at').nullable().defaultTo(null);
      t.timestamp('updated_at').nullable().defaultTo(null);
      t.collate('utf8_general_ci');
    });
  };
  
  exports.down = async knex => {
    await knex.schema.dropTableIfExists('media');
  };