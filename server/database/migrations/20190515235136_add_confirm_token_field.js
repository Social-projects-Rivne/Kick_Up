
exports.up = async knex => {
    await knex.schema.table('users', t => {
        t.string('reset_token', 32)
        .nullable()
        .after('password')
    });
  };
  
  exports.down = async knex => {
    await knex.schema.table('users', t => {
      t.dropColumn('reset_token');
    });
  };