const express = require('express');
const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

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
  celebrate(
    {
      body: Joi.object().keys(
        {
          name: Joi.string().min(2).max(30),
          about: Joi.string().min(2).max(30),
          //  avatar: Joi.string().pattern(new RegExp()),
          //  email: Joi.string().required().email(),
          //  password: Joi.string().required(),
        },
      ),
    },
  ),
  createUser,
);

app.post('/signin', login);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'Ресурс не найден!' });
  next();
});

app.listen(PORT);
