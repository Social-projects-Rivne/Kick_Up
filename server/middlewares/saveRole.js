const { validate, JWTService } = require('./../services');
const { User } = require('../models');

module.exports = async (ctx, next) => {
  await validate(ctx.header, {
    authorization: 'regex:/^Bearer\\s{1}([A-z\\.0-9-]+)$/'
  });
  if(ctx.header.authorization){
    const [, token] = ctx.header.authorization.split(' ');
    const decoded = await JWTService.verifyToken(token);
    const user = await User.where({id:decoded.data.id}).fetch();
    ctx.state.user_id = decoded.data.id;
    ctx.state.role = user.get('role');
  }
  await next();
};