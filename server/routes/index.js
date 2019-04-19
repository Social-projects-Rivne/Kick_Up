const homeRouter = require('./home');
const { signinRouter,signupRouter } = require('./auth');
const { exceptionHandler } = require('./../services/errors');
const errorHandler = require('./../services/errors/ErrorHandler');
const uploadRouter = require('./upload');
const roomRouter = require('./room');
const eventRouter = require('./event');
const profileRouter = require('./profile');
// const exceptionHandler = require('../services/error/ExceptionHandler.js.js');
module.exports = app => {
  // global middlewares
  app.use(exceptionHandler);
  app.use(errorHandler);
  
  // Api routes
  app.use(homeRouter);
  app.use(uploadRouter);
  //auth
  app.use(signinRouter)
  app.use(signupRouter)


  app.use(profileRouter)
  app.use(eventRouter);
  app.use(roomRouter);

};
