const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { SECRET_KEY } = require('../utils/constants');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация!');
  }
  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new AuthError('Необходима авторизация!');
  }

  req.user = payload;

  return next();
};
