const jwt = require('jsonwebtoken');
const { handleAuthError } = require('../errors/errors');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, '123');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  return next();
};
