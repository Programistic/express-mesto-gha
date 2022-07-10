const FoundError = require('./FoundError');
const AuthError = require('./AuthError');
const RequestError = require('./RequestError');
const ServerError = require('./ServerError');
const ConflictError = require('./ConflictError');

const handleCardFound = (card, res) => {
  if (!card) {
    throw new FoundError('Карточка не найдена!');
    //  res.status(NOT_FOUND).send({ message: 'Карточка не найдена!' });
  } else {
    res.send({ card });
  }
};

const handleUserFound = (user, res) => {
  if (!user) {
    throw new FoundError('Пользователь не найден!');
    //  res.status(NOT_FOUND).send({ message: 'Пользователь не найден!' });
  } else {
    res.send({ user });
  }
};

const handleConflictError = (err, res) => {
  if (err.code === 11000) {
    throw new ConflictError('Email уже существует!');
  }
};

const handleAuthError = () => {
  throw new AuthError('Необходима авторизация!');
  //  res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
};

const handleError = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new RequestError('Переданы некорректные данные!');
    //  res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные!' });
  } else {
    throw new ServerError('Внутренняя ошибка сервера!');
    //  res.status(SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера!' });
  }
};

module.exports = {
  handleCardFound,
  handleUserFound,
  handleAuthError,
  handleConflictError,
  handleError,
};
