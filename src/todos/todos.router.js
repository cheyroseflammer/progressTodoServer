const router = require('express').Router({ mergeParams: true });
const controller = require('./todos.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').post(controller.create).put(controller.update).all(methodNotAllowed);

router.route('/:userEmail').get(controller.read).all(methodNotAllowed);

// router.route('/:todoId([0-9]+)').all(methodNotAllowed);

module.exports = router;
