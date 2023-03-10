const todosService = require('./todos.service');
const hasProperties = require('../errors/hasProperties');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const VALID_PROPERTIES = ['user_email', 'title', 'description', 'date'];

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

const hasRequiredProperties = hasProperties('user_email', 'title');

async function todoExists(req, res, next) {
  const todo = await todosService.read(req.params.userEmail);
  if (todo) {
    res.locals.todo = todo;
    return next();
  }
  next({ status: 404, message: `Todo cannot be found` });
}

function read(req, res) {
  // const user_email = req.params.userEmail;
  const { todo: data } = res.locals;
  res.json({ data });
}

async function create(req, res) {
  const data = await todosService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedTodo = {
    ...req.body.data,
    todo_id: res.locals.todo.todo_id,
  };
  const data = await todosService.update(updatedTodo);
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(todoExists), asyncErrorBoundary(read)],
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
  update: [
    asyncErrorBoundary(todoExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
};
