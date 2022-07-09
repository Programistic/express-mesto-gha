const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const URLPattern = /^(https?:\/\/)(www\.)?[a-z\d\D]*/;

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
  URLPattern,
};
