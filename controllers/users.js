// Модуль отвечает за взаимодействие с моделью 'user'

const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден!' })
        return;
      }
      res.send({ data: user })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.getUserByIdAndUpdate = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        res.send({ message: 'Пользователь не найден!' });
        return;
      }
      res.status(200).send({ data: user })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.getUserByIdAndUpdateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then(user => {
      if (!user) {
        res.send({ message: 'Пользователь не найден!' });
        return;
      }
      res.status(200).send({ data: user })
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: 'Некорректные данные!' });
    return;
  }
  res.status(500).send({ message: 'Ошибка не определённого типа!' });
}