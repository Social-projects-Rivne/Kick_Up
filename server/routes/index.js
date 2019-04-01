const homeRouter = require('./home');
const roomRouter = require('./room');
const eventRouter = require('./event');

module.exports = app => {
  // global middlewares

  // Api routes
  app.use(homeRouter);

  //mongoDB routes
  app.use('/api/rooms',roomRouter);
  app.use('/api/events',eventRouter);

};
