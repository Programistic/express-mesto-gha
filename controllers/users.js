// Отвечает за взаимодействие с моделью 'user'

const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка при получении всех профилей' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка при получении профиля по id' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body; // получаем из объекта запроса данные пользователя, их надо записать в базу

  User.create({ name, about, avatar }) // создаём документ на основе пришедших данных
    .then(user => res.send({ data: user })) // возвращаем клиенту данные
    .catch(err => res.status(500).send({message: 'Ошибка при создании профиля'})); // возвращаем клиенту ошибку
};