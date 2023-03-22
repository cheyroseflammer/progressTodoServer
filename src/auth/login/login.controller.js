const loginService = require('./login.service');
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
  const user = {
    ...req.body.data,
  };
  const email = req.body.data.email;
  const userData = await loginService.create(user);
  const success = await bcrypt.compare(user.hashed_password, userData.hashed_password);
  const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
  if (success) {
    res.json({ email: userData.email, token });
  }
}
module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
};
