
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    switch (err.name) {
    case 'ValidationErrors':
      ctx.body = { error: { code: err.httpCode, message: 'ValidationErrors', errors: err.validation_errors.errors } };
      ctx.status = err.httpCode;
      break;
    case 'SingleValidationError':
      ctx.body = { error: { code: err.httpCode, message: 'SingleError', errors: { message: [err.message] } } };
      ctx.status = err.httpCode;
      break;
    case 'CustomError':
      switch (err.message) {
      case 'EmptyResponse':
        ctx.body = { error: { code: 404, message: 'RequestError', errors: { message: ['Entity not found'] } } };
        ctx.status = 404;
        break;
      default:
        ctx.body = { error: { code: 500, message: 'CustomError', errors: { message: ['Something went wrong'] } } };
        ctx.status = 500;
        break;
      }
      break;
    default:
      ctx.body = { error: { code: 500, message: 'ServerError', errors: { message: ['Something went wrong'] } } };
      ctx.status = 500;
      break;
    }
    console.error('\n---error:', err);
    console.error('\n');
  }
};