const express = require("express");
const mongoose = require("mongoose");
//const path = require('path');
const app = express(); // создать express-приложение
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

//app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});