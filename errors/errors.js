const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/constants');

const handleCardNotFound = (card, res) => {
  if (!card) {
    res.status(NOT_FOUND).send({ message: 'Карточка не найдена!' })
    return;
  }
}

const handleUserNotFound = (user, res) => {
  if (!user) {
    res.status(NOT_FOUND).send({ message: 'Пользователь не найден!' })
    return;
  }
}

const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные!' });
    return;
  }
  res.status(SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера!' });
}

module.exports = {
  handleCardNotFound,
  handleUserNotFound,
  handleError
}