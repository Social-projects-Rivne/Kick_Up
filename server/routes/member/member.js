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
        const count = await Member.where({entity_type:type,entity_id}).count();
       ctx.body = count;
    },
    async leave(ctx){
        await validate({...ctx.params},{
            type: `required|string|in:${entity_types.join()}`,
            entity_id: 'required|numeric|min:1',
        })
       const { type,entity_id } = ctx.params;
       const { user_id } = ctx.state;
       const member = await Member.where({user_id,entity_type:type,entity_id}).fetch({require: true});
       await member.destroy();
       const count = await Member.where({entity_type:type,entity_id}).count();
       ctx.body = count;
    },
    async checkInvite(ctx){
        await validate({...ctx.params},{
            type: `required|string|in:${entity_types.join()}`,
            entity_id: 'required|numeric|min:1',
        })
       const { type,entity_id } = ctx.params;
       const { user_id } = ctx.state;
        const invite = await Member.where({user_id,entity_type:type,entity_id}).fetch({withRelated:['users']},{require: true});
        const count = await Member.where({entity_type:type,entity_id}).count();
        ctx.body = {
            invite,
            count
        };
    },
    async members(ctx){
        await validate({...ctx.params},{
            type: `required|string|in:${entity_types.join()}`,
            entity_id: 'required|numeric|min:1',
        })
       const { type,entity_id } = ctx.params;
        const members = await Member.where({entity_type:type,entity_id}).fetchAll({withRelated:['users']},{require: true});
        ctx.body = members;
    }
}
router.use(authenticated)
router.post('/:type/join', handler.join);
router.delete('/:type/:entity_id', handler.leave);
router.get('/:type/:entity_id', handler.checkInvite);
router.get('/:type/:entity_id/members', handler.members);

module.exports = router.routes();