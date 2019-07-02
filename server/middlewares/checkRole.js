const { User } = require('../models');

module.exports = async (ctx, next) => {
    const { user_id } = ctx.state;
    const user = await User.where({id:user_id, role:1}).fetch();
    if(!user){
        ctx.throwSingle('Wrong Role!')
    }
  await next();
};