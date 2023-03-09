const todos = require('../fixtures/todos');

exports.seed = function (knex) {
  return knex.raw('TRUNCATE TABLE todos RESTART IDENTITY CASCADE').then(function () {
    return knex('todos').insert(todos);
  });
};
