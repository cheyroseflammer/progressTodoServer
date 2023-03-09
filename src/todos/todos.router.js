const router = require('express').Router({ mergeParams: true });
const controller = require('./todos.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

// Get all todos
router.route('/').get(controller.list).all(methodNotAllowed);

router.route('/:userEmail').get(controller.read).all(methodNotAllowed);

module.exports = router;
