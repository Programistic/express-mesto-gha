const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { handleUserFound, handleError, handleConflictError } = require('../errors/errors');
//  const { UNAUTHORIZED } = require('../utils/constants');
const AuthError = require('../errors/AuthError');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashPassword) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashPassword,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      handleError(err);
    })
    .catch((err) => {
      handleConflictError(err);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { _id } = req.params;
  User.findById(_id)
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

const getUserByIdAndUpdate = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

const getUserByIdAndUpdateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password') //  идентификация по почте
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильная почта или пароль!');
        //  res.status(UNAUTHORIZED).send({ message: 'Неправильная почта или пароль2!' });
        //  return;
      }
      bcrypt.compare(password, user.password) //  аутентификация
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильная почта или пароль!');
            //  res.status(UNAUTHORIZED).send({ message: 'Неправильная почта или пароль!' });
            //  return;
          }
          const token = jwt.sign(
            { _id: user._id },
            '123',
            { expiresIn: '7d' },
          );
          res.send({ message: 'Успешная авторизация!', token });
        });
    })
    .catch(() => {
      throw new AuthError('Ошибка авторизации!');
      //  res.status(UNAUTHORIZED).send({ message: 'Ошибка авторизации!' });
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  createUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndUpdateAvatar,
  login,
};
