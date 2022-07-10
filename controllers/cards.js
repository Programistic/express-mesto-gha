const Card = require('../models/card');
const { handleCardFound, handleError } = require('../errors/errors');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ card }))
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  const { _id } = req.params;
  Card.findByIdAndRemove(_id)
    .then((card) => {
      handleCardFound(card, res);
    })
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { _id } = req.params;
  Card.findByIdAndUpdate(
    _id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      handleCardFound(card, res);
    })
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { _id } = req.params;
  Card.findByIdAndUpdate(
    _id,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      handleCardFound(card, res);
    })
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
