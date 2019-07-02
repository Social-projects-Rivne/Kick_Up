const Router = require('koa-router');
const router = new Router({ prefix: '/api/admin' });
const { authenticated, checkRole } = require('../../middlewares');
const {Room, Event, Complaint} = require('../../models');
const constants = require('../../config/constants');
const entity_types = Object.values(constants.rating.entity_types);
const validate = require('../../services/Validator');

const rule = {
  types:{
    entity_type: `required|string|in:${entity_types.join()}`,
  }
};

const handler = {
  async createComplains(ctx){  
    await validate(ctx.params, rule.types);
    const { text, entity_id } = ctx.request.body;
    const { user_id } = ctx.state;
    const { entity_type } = ctx.params;
    const model = entity_type === constants.rating.entity_types.room ? Room : Event;
    await model.where({ id:entity_id }).fetch({require:true})
    const existComplaint = await Complaint.where({user_id, entity_id,entity_type}).fetch();
    if(existComplaint) {
      ctx.throwSingle('You have already sent a complaint, we are working on it, thanks')
    }
    await new Complaint({user_id, text, entity_type, entity_id}).save();
    ctx.body = ''
  }
};

router.use(authenticated);
router.post('/:entity_type/complaint/create', handler.createComplains);

module.exports = router.routes();