const express = require('express');
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

app.use((req, res, next) => {
  req.user = {
    _id: '62b1b7cfc7a30e8c967386df',
  };
  next();
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'Ресурс не найден!' });
  next();
});

app.listen(PORT);
