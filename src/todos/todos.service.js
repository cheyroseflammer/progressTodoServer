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

module.exports = {
  read,
  create,
};
