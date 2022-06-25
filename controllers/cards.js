const Card = require('../models/card');
const { handleError } = require('../utils/constants');

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
    .then(card => res.send({ card }))
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
      res.send({ card })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true, runValidators: true })
    .then(card => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена!' })
        return;
      }
      res.send({ card })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true, runValidators: true })
    .then(card => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена!' })
        return;
      }
      res.send({ card })
    })
    .catch((err) => {
      handleError(err, res);
    });
};