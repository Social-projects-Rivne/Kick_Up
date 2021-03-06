
exports.up = async knex => {
  await knex.schema.createTable('events', t => {
    t.increments('id').unsigned().primary();
    t.string('title').nullable();
    t.integer('creator_id').unsigned();
    t.integer('category_id').unsigned();
    t.integer('room_id').nullable().unsigned();
    t.string('description',500).nullable();
    t.string('cover').nullable();
    t.string('location').nullable();
    t.integer('permission').nullable().defaultTo(0);
    t.integer('members_limit').nullable();
    t.integer('members').nullable().defaultTo(1);
    t.float('eventRating').nullable().defaultTo(0);
    t.boolean('is_banned').defaultTo(false);
    t.dateTime('start_date').notNull();
    t.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.dateTime('updated_at').nullable().defaultTo(knex.raw('now()'));
    t.foreign('creator_id')
      .references('users.id')
      .onDelete('CASCADE');
    t.foreign('room_id')
      .references('rooms.id')
      .onDelete('CASCADE');
    t.foreign('category_id')
      .references('categories.id')
      .onDelete('CASCADE');
    t.collate('utf8_general_ci');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('events');
};
