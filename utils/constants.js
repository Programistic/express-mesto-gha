const URLPattern = /^(https?:\/\/)(www\.)?[a-z\d\D]*/;

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  URLPattern,
  limiter,
};
