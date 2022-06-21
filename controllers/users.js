// Модуль отвечает за взаимодействие с моделью 'user'

const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch((err) => {
      handleError(err, res);  // возвращаем клиенту ошибку
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
      handleError(err, res);  // возвращаем клиенту ошибку
    });
};

module.exports.getUserByIdAndUpdate = (req, res) => {
  //const { name, about } = req.body;

  User.findByIdAndUpdate(req.params._id, { name: req.body.name, about: req.body.about }, { new: true })
    .then(user => {
      if (!user) {
        res.send({ message: 'Пользователь не найден!' });
        return;
      }
      res.status(200).send({ data: user })
    })
    .catch((err) => {
      handleError(err, res);  // возвращаем клиенту ошибку
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body; // получаем из объекта запроса данные пользователя, их надо записать в базу

  User.create({ name, about, avatar }) // создаём документ на основе пришедших данных
    .then(user => res.status(200).send({ data: user })) // возвращаем клиенту данные
    .catch((err) => {
      handleError(err, res);  // возвращаем клиенту ошибку
    });
};

const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: 'Некорректные данные!' });
    return;
  }
  res.status(500).send({ message: 'Ошибка не определённого типа!' });
}