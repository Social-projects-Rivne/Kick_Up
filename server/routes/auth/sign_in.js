const Router = require('koa-router');
const { validate, JWTService } = require('../../services');
const { User } = require('./../../models');
const router = new Router({ prefix: '/api' });

const rule = {
  email: 'required|email',
  password: 'required|min:6'
};

const heandler = {
  async sign_in(ctx) {
    await validate(ctx.request.body, rule);
    const { email, password } = ctx.request.body; 
    const userCount = await User.where({ email: email.toLowerCase() }).count();
    if (!userCount) {
        ctx.throwSingle('Wrong email!',400);
      }
    const user = await User.where({ email: email.toLowerCase() }).fetch();
    if (!(await user.comparePassword(password))) {
      ctx.throwSingle('Wrong password!',400);
    }
    ctx.body = {
        token: `Bearer ${JWTService.signUser(user)}`,
        id: user.get('id')
      };
  }
};

router.post('/signin', heandler.sign_in);

module.exports = router.routes();