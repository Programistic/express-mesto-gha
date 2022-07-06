const userRouter = require('express').Router();

const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndUpdateAvatar,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('./me', getCurrentUser);
userRouter.get('/:_id', getUserById);
userRouter.patch('/me', getUserByIdAndUpdate);
userRouter.patch('/me/avatar', getUserByIdAndUpdateAvatar);

module.exports = userRouter;
