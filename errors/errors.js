const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/constants');

const handleCardFound = (card, res) => {
  if (!card) {
    res.status(NOT_FOUND).send({ message: 'Карточка не найдена!' });
  } else {
    res.send({ card });
  }
};

const handleUserFound = (user, res) => {
  if (!user) {
    res.status(NOT_FOUND).send({ message: 'Пользователь не найден!' });
  } else {
    res.send({ user });
  }
};

const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные!' });
  } else {
    res.status(SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера!' });
  }
};

module.exports = {
  handleCardFound,
  handleUserFound,
  handleError,
};
