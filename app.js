const express = require("express");
const app = express(); // создать express-приложение
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
})