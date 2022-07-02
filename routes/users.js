const userRouter = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndUpdateAvatar,
  login,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/:_id', getUserById);
userRouter.patch('/me', getUserByIdAndUpdate);
userRouter.patch('/me/avatar', getUserByIdAndUpdateAvatar);
userRouter.post('./signin', login);
userRouter.post('/signup', createUser);

module.exports = userRouter;
