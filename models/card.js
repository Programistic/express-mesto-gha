//  Схема карточки

const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true,
    // ссылка на картинку
  },
  owner: {
    type: Objectld,
    required: true,
    //  ссылка на модель автора карточки
  },
  likes: {
    type: Objectld,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);