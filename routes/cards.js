const cardRouter = require('express').Router();
const { getAllCards, createCard, deleteCardById, likeCard, dislikeCard } = require('../controllers/cards');

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:_id', deleteCardById);
cardRouter.put('/:_id/likes', likeCard);
cardRouter.delete('/:_id/likes', dislikeCard);

module.exports = cardRouter;