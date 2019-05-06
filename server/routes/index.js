const homeRouter = require('./home');
const { signinRouter,signupRouter } = require('./auth');
const { exceptionHandler } = require('./../services/errors');
const errorHandler = require('./../services/errors/ErrorHandler');
const uploadRouter = require('./upload');
const roomRouter = require('./room/room');
const eventRouter = require('./event/event');
const profileRouter = require('./profile/profile');
const tagRouter = require('./tag/tag');
const categoryRouter = require('./category/category');
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

  //profile
  app.use(profileRouter)
  //event
  app.use(eventRouter);
  //room
  app.use(roomRouter);
  //tag
  app.use(tagRouter);
  //category
  app.use(categoryRouter);


};
