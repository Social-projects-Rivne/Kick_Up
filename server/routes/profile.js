const Router = require('koa-router');
const { authenticated } = require('./../middlewares');
const { User } = require('./../models');
const Validator = require('./../services');

const router = new Router({prefix:'/api/profile'});

const handler = {
    async getSelfProfile(ctx){
        const { user_id } = ctx.state; 
        const user = await User.where({id:user_id}).fetch();
        ctx.body = user;        
    },
    async getUserProfileById(ctx){
        const { id } = ctx.params;
        const user = await User.where({id}).fetch({require: true});
        ctx.body = user;        
    },
    async updateUser(ctx){
        const { user_id } = ctx.state; 
        const { nick, first_name, last_name, avatar, birth_date } = ctx.request.body;
        const user = await User.where({id:user_id}).save({nick, first_name, last_name, avatar, birth_date},{ patch:true })
        ctx.body = user       
    }
}
router.use(authenticated)
router.get('/', handler.getSelfProfile);
router.get('/:id', handler.getUserProfileById);
router.put('/update', handler.updateUser);

module.exports = router.routes();