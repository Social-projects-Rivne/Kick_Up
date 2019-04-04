const homeRouter = require('./home');
const roomRouter = require('./room');
const eventRouter = require('./event');
const { signinRouter, signupRouter } = require('./auth');
const errorHandler = require('./../services/errorHandler');

module.exports = app => {
  // global middlewares

  // Api routes
  app.use(homeRouter);
  //auth
  app.use(signinRouter)
  app.use(signupRouter)

  //mongoDB routes
  app.use('/api/rooms',roomRouter);
  app.use('/api/events',eventRouter);

  //error handler
  app.use(errorHandler);
};
