const limiter = require('express-rate-limit');

const rateLimiter = limiter({
  max: 130,
  windowMS: 1 * 60 * 1000,
  message: 'В настоящий момент превышено количество запросов на сервер. Пожалуйста, попробуйте повторить позже',
});

module.exports = rateLimiter;
