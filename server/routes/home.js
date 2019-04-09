const Router = require('koa-router');
const router = new Router({ prefix: '/api' });
const handler = {

  async home(ctx) {
    ctx.body = 'home';
  }
  
};
router.get('/', handler.home);

module.exports = router.routes();