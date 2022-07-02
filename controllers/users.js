const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { handleUserFound, handleError } = require('../errors/errors');
const { UNAUTHORIZED } = require('../utils/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch((err) => {
      handleError(err, res);
    });
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  const hashPassword = bcrypt.hash(password, 10);

  User.create({
    name,
    about,
    avatar,
    email,
    hashPassword,
  })
    .then((user) => res.send({ user }))
    .catch((err) => {
      handleError(err, res);
    });
};

const getUserById = (req, res) => {
  const { _id } = req.params;
  User.findById(_id)
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getUserByIdAndUpdate = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getUserByIdAndUpdateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(UNAUTHORIZED).send({ message: 'Неправильная почта или пароль!' });
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        res.status(UNAUTHORIZED).send({ message: 'Неправильная почта или пароль!' });
      } else {
        const token = jwt.sign(
          { _id: '62b1b7cfc7a30e8c967386df' },
          '123',
          { expiresIn: '7d' },
        );
        res.send({ message: 'Всё верно!', token });
      }
    })
    .catch(() => {
      res.status(UNAUTHORIZED).send({ message: 'Ошибка авторизации!' });
    });
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndUpdateAvatar,
  login,
};
