const knex = require('../db/connection');

function read(user_email) {
  return knex('todos').select('*').where({ user_email });
}

function create(todo) {
  return knex('todos')
    .insert(todo)
    .returning('*')
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedTodo) {
  return knex('todos')
    .select('*')
    .where({ todo_id: updatedTodo.todo_id })
    .update(updatedTodo, '*')
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  read,
  create,
  update,
};
