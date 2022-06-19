const userRouter = require('express').Router();
const { getAllUsers, getUserById, createUser } = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);

module.exports = userRouter;