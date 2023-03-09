const router = require('express').Router({ mergeParams: true });
const controller = require('./users.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:userId').get(controller.list).post(controller.create).all(methodNotAllowed);

router
  .route('/:userId([0-9]+)')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
