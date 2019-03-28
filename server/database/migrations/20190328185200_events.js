
exports.up = async knex => {
  await knex.schema.createTable('events', t => {
    t.increments('id').unsigned().primary();
    t.string('title').nullable();
    t.integer('creator_id').unsigned();
    t.integer('category_id').unsigned();
    t.integer('room_id').unsigned();
    t.string('description').nullable();
    t.string('cover').nullable();
    t.string('location').nullable();
    t.integer('permission').nullable();
    t.integer('members_limit').nullable();
    t.boolean('is_banned').defaultTo(false);
    t.dateTime('start_date').notNull();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.foreign('creator_id')
      .references('users.id')
      .onDelete('CASCADE');
    t.foreign('room_id')
      .references('rooms.id')
      .onDelete('CASCADE');
    t.foreign('category_id')
      .references('categories.id')
      .onDelete('CASCADE');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('events');
};