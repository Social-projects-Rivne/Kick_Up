const Router = require('koa-router');
const { authenticated } = require('./../../middlewares');
const { User, Member } = require('./../../models');
const { validate } = require('./../../services');
const constants = require('./../../config/constants');
const entity_types = Object.values(constants.rating.entity_types);

const router = new Router({prefix:'/api/member'});
const handler = {
    async join(ctx){
        await validate({...ctx.params, ...ctx.request.body},{
            type: `required|string|in:${entity_types.join()}`,
            entity_id: 'required|numeric|min:1',
        })
       const { type } = ctx.params;
       const { user_id } = ctx.state;
       const { entity_id } = ctx.request.body;
       const member = await Member.where({user_id,entity_type:type,entity_id}).fetch()
        if(member){
            ctx.throwSingle(`You are already a member of this ${type}`, 403)
        }
        if(type === constants.rating.entity_types.room){
            await new Member({user_id,entity_type:constants.rating.entity_types.room,entity_id}).save();
        } else {
            await new Member({user_id,entity_type:constants.rating.entity_types.event,entity_id}).save();
        }
       
       ctx.body = '';
    },
    async leave(ctx){
        await validate({...ctx.params, ...ctx.request.body},{
            type: `required|string|in:${entity_types.join()}`,
            entity_id: 'required|numeric|min:1',
        })
       const { type } = ctx.params;
       const { user_id } = ctx.state;
       const { entity_id } = ctx.request.body;
       const member = await Member.where({user_id,entity_type:type,entity_id}).fetch({require: true});
       await member.destroy();
       
       ctx.body = '';
    }
}
router.use(authenticated)
router.post('/:type/join', handler.join);
router.delete('/:type/leave', handler.leave);

module.exports = router.routes();