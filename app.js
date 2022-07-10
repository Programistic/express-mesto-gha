const express = require('express');
const {
  celebrate,
  Joi,
  Segments,
  errors,
} = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { URLPattern } = require('./utils/constants');

const { NOT_FOUND } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(URLPattern),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use(errors());

app.use((req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'Ресурс не найден!' });
  next();
});

app.use((err, req, res) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT);
