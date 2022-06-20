const userRouter = require('express').Router();
const { getAllUsers, getUserById, getUserByIdAndUpdate, createUser } = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.get('/:userId', getUserByIdAndUpdate);
userRouter.post('/', createUser);

module.exports = userRouter;