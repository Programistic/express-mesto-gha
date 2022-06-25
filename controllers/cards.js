const Card = require('../models/card');
const { handleCardNotFound, handleError } = require('../errors/errors');

const getAllCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ card }))
    .catch((err) => {
      handleError(err, res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ card }))
    .catch((err) => {
      handleError(err, res);
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then(card => {
      handleCardNotFound(card)
      res.send({ card })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true, runValidators: true })
    .then(card => {
      handleCardNotFound(card)
      res.send({ card })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true, runValidators: true })
    .then(card => {
      handleCardNotFound(card)
      res.send({ card })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard
}