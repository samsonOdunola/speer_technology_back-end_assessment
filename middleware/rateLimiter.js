const {rateLimit} = require('express-rate-limit');
const rateOptions = require('../config/rateLimit');

const rateLimiter = rateLimit({
  windowMs: rateOptions.window,
  limit: rateOptions.limit,
  message: rateOptions.message,
  standardHeaders: true,
  legacyHeaders: false,

});


module.exports = rateLimiter;
