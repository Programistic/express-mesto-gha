const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const app = express(); // создать express-приложение
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62b1b7cfc7a30e8c967386df'
  };
  next();
})

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});