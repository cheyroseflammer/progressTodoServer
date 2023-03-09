const knex = require('../db/connection');

function list() {
  return knex('todos').select('*');
}

function read(user_email) {
  return knex('todos').select('*').where({ user_email });
}

module.exports = {
  list,
  read,
};
