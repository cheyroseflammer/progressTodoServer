const router = require('express').Router({ mergeParams: true });
const controller = require('./todos.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').post(controller.create).all(methodNotAllowed);

router.route('/:userEmail').get(controller.read).all(methodNotAllowed);

module.exports = router;
