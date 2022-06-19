// Отвечает за взаимодействие с моделью 'user'

const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка при получении профиля' }));
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { name: req.body.name, about: req.body.about, avatar: req.body.avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка при обновлении профиля' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body; // получаем из объекта запроса данные пользователя, их надо записать в базу

  User.create({ name, about, avatar }) // создаём документ на основе пришедших данных
    .then(user => res.send({ data: user })) // возвращаем клиенту данные
    .catch(err => res.status(500).send({message: 'Ошибка при создании профиля'})); // возвращаем клиенту ошибку
};

module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка при удалении профиля' }));
};