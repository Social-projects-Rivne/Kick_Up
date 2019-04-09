const Router = require('koa-router');
const { validate, JWTService } = require('../../services');
const { User } = require('../../models');

const router = new Router({ prefix: '/api' });

const heandler = {
  async sign_up(ctx) {
    await validate(ctx.request.body, {
      email: 'required|email',
      password: 'required|min:10'
    });
    const { email, password } = ctx.request.body;
    const userCount = await User.where({ email:email.toLowerCase() }).count();
    if (userCount) {
      ctx.throwSingle('User with this email already registered',409);
    }
    await new User({
      email,
      password
    }).save();
    const user = await User.where({ email:email.toLowerCase() }).fetch();

    ctx.body = {
      token: `Bearer ${JWTService.signUser(user)}`,
      id: user.get('id')
    };
  }
};

router.post('/signup', heandler.sign_up);
module.exports = router.routes();