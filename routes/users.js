const userRouter = require('express').Router();
const { getAllUsers, getUserById, getUserByIdAndUpdate, createUser } = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/:_id', getUserById);
userRouter.get('/:_id', getUserByIdAndUpdate);
userRouter.post('/', createUser);

module.exports = userRouter;