const cardRouter = require('express').Router();
const { getAllCards, createCard, deleteCardById, likeCard, dislikeCard } = require('../controllers/cards');

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:_cardId', deleteCardById);
cardRouter.put('/:_cardId/likes', likeCard);
cardRouter.delete('/:_cardId/likes', dislikeCard);

module.exports = cardRouter;