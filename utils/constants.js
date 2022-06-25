const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'Некорректные данные!' });
    return;
  }
  res.status(SERVER_ERROR).send({ message: 'Ошибка не определённого типа!' });
}

module.exports = {
  NOT_FOUND,
  handleError
};