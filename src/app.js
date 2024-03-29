const express = require('express');
const cors = require('cors');
const todosRouter = require('./todos/todos.router');
const signupRouter = require('./auth/signup/signup.router');
const loginRouter = require('./auth/login/login.router');
const app = express();

app.use(cors());

app.use(express.json());

app.use('/todos', todosRouter);

app.use('/signup', signupRouter);

app.use('/login', loginRouter);

app.get('/hello', (req, res) => {
  res.send('Hello');
});

app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

app.use((error, req, res, next) => {
  console.log(error);
  const { status = 500, message = 'Something went wrong!' } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
