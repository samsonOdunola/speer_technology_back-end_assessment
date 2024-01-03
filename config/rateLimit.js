const rateOptions = {
  window: 15 * 60 * 1000, // Window of request (15 minutes)
  limit: 50, // number of requests in window
  message: 'you have exceeded your rate limit',

};

module.exports = rateOptions;
