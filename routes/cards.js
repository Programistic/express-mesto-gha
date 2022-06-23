const cardsRouter = require('express').Router();
const { getAllCards, createCard, deleteCardById } = require('../controllers/cards');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:_id', deleteCardById);

module.exports = cardsRouter;