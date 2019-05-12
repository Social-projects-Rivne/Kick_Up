
exports.up = async knex => {
  await knex.schema.createTable('users', t => {
    t.increments('id').unsigned().primary();
    t.string('nick').nullable();
    t.string('first_name').nullable();
    t.string('last_name').nullable();
    t.integer('gender').notNull().defaultTo(3);
    t.string('email').notNull();
    t.string('password').notNull();
    t.string('avatar').nullable();
    t.integer('carma').nullable();
    t.integer('role').defaultTo(2);
    t.boolean('is_banned').defaultTo(false);
    t.date('birth_date').nullable();
    t.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.dateTime('updated_at').nullable().defaultTo(knex.raw('now()'));
    t.collate('utf8_general_ci');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('users');
};