const jwt = require('jsonwebtoken');
//  const { handleAuthError } = require('../errors/errors');
const AuthError = require('../errors/AuthError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация!');
    //  return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, '123');
  } catch (err) {
    throw new AuthError('Необходима авторизация!');
    //  return handleAuthError(res);
  }

  req.user = payload;

  next();
};
