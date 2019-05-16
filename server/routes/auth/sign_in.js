const Router = require('koa-router');
const { validate, JWTService } = require('../../services');
const { hashPassword } = require('./../../services/Bcript')

const { User } = require('./../../models');
const router = new Router({ prefix: '/api' });
const Mailer = require('./../../services/Mailer');
const crypto = require('crypto');
const rule = {
  sign_in:{
    email: 'required|email',
    password: 'required|min:6'
  },
  forgotPassword: {
    email: 'required|email'
  },
  recoveryPassword: {
    reset_token: 'required|size:32|alpha_num',
    password: 'required|string|min:6'
  }
};

const handler = {
  async sign_in(ctx) {
    await validate(ctx.request.body, rule.sign_in);
    const { email,password } = ctx.request.body; 
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
  },
  forgotPassword: async ctx => {
    const { email } = ctx.request.body;
    await validate(ctx.request.body, rule.forgotPassword);

    const user = await User.where({ email: email.toLowerCase() }).fetch();
    if (!user) {
      ctx.throwSingle('Wrong email!');
    }

    const reset_token = crypto
      .createHash('md5')
      .update(crypto.randomBytes(8))
      .digest('hex');

    await user.save({ reset_token }, { patch: true });
    await Mailer.sendForgotPassword(user.get('id'))
    ctx.body = '';
  },
  recoveryPassword: async ctx => {
    const { reset_token, password } = ctx.request.body;
    await validate(ctx.request.body, rule.recoveryPassword);
    const user = await User.where({ reset_token }).fetch();
    console.log(user);
    if (!user) {
      ctx.throwSingle('User not found');
    }
    const newPassword = await hashPassword(password);
    await User.where({reset_token}).save({password: newPassword,reset_token: null},{ patch:true })
    ctx.body = '';
  }
};

router.post('/signin', handler.sign_in);
router.post('/forgot-password', handler.forgotPassword);
router.patch('/forgot-password', handler.recoveryPassword);

module.exports = router.routes();