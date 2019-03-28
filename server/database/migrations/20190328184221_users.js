
exports.up = async knex => {
  await knex.schema.createTable('users', t => {
    t.increments('id').unsigned().primary();
    t.string('nick').notNull();
    t.string('first_name').nullable();
    t.string('last_name').nullable();
    t.string('email').nullable();
    t.string('password').nullable();
    t.string('avatar').nullable();
    t.integer('carma').nullable();
    t.integer('role').defaultTo(2);
    t.boolean('is_banned').defaultTo(false);
    t.dateTime('birth_date').nullable();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('users');
};