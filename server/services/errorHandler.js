module.exports = (err, req, res, next) => {
  const error = {
    error: {
      code: 500,
      message: '',
      status: '',
      details: []
    }
  };
  switch (err.constructor.name) {
    case 'Errors':
      error.error.code = 400;
      error.error.details = err.errors;
      error.error.message = 'validation errors';
      break;
    case 'Error':
      error.error.code = 500;
      error.error.details = err.errors;
      error.error.message = err.message;
      break;
    case 'ClientError':
      error.error.code = 404;
      error.error.details = err.errors;
      error.error.message = err.message;
      break;
  }

  res.status(error.error.code);
  res.json(error);
};