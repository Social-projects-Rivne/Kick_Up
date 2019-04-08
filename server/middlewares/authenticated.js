const { validate, JWTService } = require('./../services');

module.exports = async (ctx, next) => {
  await validate(ctx.header, {
    authorization: 'required|regex:/^Bearer\\s{1}([A-z\\.0-9-]+)$/'
  });
  const [, token] = ctx.header.authorization.split(' ');
  const decoded = await JWTService.verifyToken(token);
  ctx.state.user_id = decoded.data.id;
  await next();
};