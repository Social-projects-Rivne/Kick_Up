const homeRouter = require('./home');
const roomsRouter = require('./rooms');
const eventRouter = require('./event');
const { signinRouter, signupRouter } = require('./auth');

module.exports = app => {
  // global middlewares

  // Api routes
  app.use(homeRouter);
  //auth
  app.use(signinRouter)
  app.use(signupRouter)

  //mongoDB routes
  app.use('/api/rooms',roomsRouter);
  app.use('/api/events',eventRouter);

};
