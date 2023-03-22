const knex = require('../../db/connection');

function create(user) {
  return knex('users').select('*').where({ email: user.email }).first();
}

module.exports = {
  create,
};
