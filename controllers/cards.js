// Модуль отвечает за взаимодействие с моделью 'card'

const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.status(200).send({ data: card }))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.delete(req.card._id)
    .then(card => res.status(200).send({ data: card }))
    .catch((err) => {
      handleError(err, res);
    });
};

const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: 'Некорректные данные!' });
    return;
  }
  res.status(500).send({ message: 'Ошибка не определённого типа!' });
};