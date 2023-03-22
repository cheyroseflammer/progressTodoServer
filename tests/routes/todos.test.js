// Imports
const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/db/connection');

describe('Todo Routes', () => {
  beforeAll(() => {
    return db.migrate.forceFreeMigrationsLock(), then(() => db.migrate.rollback(null, true));
  });
});
