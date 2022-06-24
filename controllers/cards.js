// Модуль отвечает за взаимодействие с моделью 'card'

const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ card }))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.status(200).send({ card }))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then(card => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена!' })
        return;
      }
      res.status(200).send({ card })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { _id: req.user._id } }, { new: true, runValidators: true })
    .then(card => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена!' })
        return;
      }
      res.status(200).send({ card })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { _id: req.user._id } }, { new: true, runValidators: true })
    .then(card => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена!' })
        return;
      }
      res.status(200).send({ card })
    })
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
}