const homeRouter = require('./home');
module.exports = app => {
  // global middlewares

  // Api routes
  app.use(homeRouter);

};
