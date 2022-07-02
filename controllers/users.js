const User = require('../models/user');
const { handleUserFound, handleError } = require('../errors/errors');

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch((err) => {
      handleError(err, res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  const hashPassword = bcrypt.hash(password, 10);

  User.create({ name, about, avatar, email, hashPassword })
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

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndUpdateAvatar,
};
