const router = require('express').Router({ mergeParams: true });
const signupService = require('./signup.service');
const hasProperties = require('../../errors/hasProperties');
const asyncErrorBoundary = require('../../errors/asyncErrorBoundary');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const VALID_PROPERTIES = ['email', 'hashed_password'];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(', ')}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties('email', 'hashed_password');

async function create(req, res) {
  const password = req.body.data.hashed_password;
  const email = req.body.data.email;
  const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const user = {
    ...req.body.data,
    hashed_password: hash,
  };
  const data = await signupService.create(user);
  res.json({ data, token });
}

module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
};
