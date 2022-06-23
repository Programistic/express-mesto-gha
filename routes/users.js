const userRouter = require('express').Router();
const { getAllUsers, getUserById, getUserByIdAndUpdate, createUser } = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.get('/:_id', getUserById);
userRouter.patch('/me', getUserByIdAndUpdate);
userRouter.patch('/me/avatar', getUserByIdAndUpdateAvatar);

module.exports = userRouter;