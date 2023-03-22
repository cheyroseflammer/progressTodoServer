exports.up = function (knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('todo_id').primary();
    table.string('user_email', 255);
    table.string('title', 30);
    table.string('description', 255);
    table.string('date', 300);
    table.boolean('completed').defaultTo(0);
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable('todos');
};
