const path = require('path');
require('dotenv').config();
const { DATABASE_URL, TEST_DATABASE_URL } = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: TEST_DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
  },
  test: {
    client: 'postgresql',
    connection: TEST_DATABASE_URL,
  },
  production: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
  },
};
