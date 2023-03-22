const router = require('express').Router({ mergeParams: true });
const controller = require('./signup.controller');
const methodNotAllowed = require('../../errors/methodNotAllowed');

router.route('/').post(controller.create).all(methodNotAllowed);

module.exports = router;
