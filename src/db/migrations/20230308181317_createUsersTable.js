exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('email', 255).primary();
    table.string('hashed_password', 255);
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
