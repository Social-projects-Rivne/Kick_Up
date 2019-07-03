const Router = require('koa-router');
const router = new Router({ prefix: '/api/admin' });
const { authenticated, checkRole } = require('../../middlewares');
const {Room, Event, Complaint} = require('../../models');
const constants = require('../../config/constants');
const entity_types = Object.values(constants.rating.entity_types);
const validate = require('../../services/Validator');
const Mailer = require('./../../services/Mailer');

const rule = {
  types:{
    entity_type: `required|string|in:${entity_types.join()}`,
  }
};

const handler = {
  async list(ctx) {
    const rooms = await Room.where({is_banned:1}).fetchAll();
    const events = await Event.where({is_banned:1}).fetchAll();
    rooms.forEach(element => {
      element.set({type:'room'})
    });
    events.forEach(element => {
      element.set({type:'event'})
    });
    ctx.body = {
      rooms,
      events
    }
  },
  async banned(ctx){
    await validate(ctx.params, rule.types);
    const { entity_id, is_banned } = ctx.request.body;
    const { entity_type } = ctx.params; 
    const model = entity_type === constants.rating.entity_types.room ? Room : Event;
    const existModel = await model.where({ id:entity_id }).fetch({require:true})
    await existModel.save({ is_banned }, { patch:true });
    ctx.body = '';
  },
  async complaints(ctx){
    await validate(ctx.query, {
      page: 'numeric|min:1'
    });
  const { page } = ctx.query;
    const complaints = await Complaint
    .fetchPage({page, pageSize: constants.pageSize, withRelated: ['creator']});
    ctx.body = {
      complaints,
      complaintCount: complaints.pagination.rowCount,
      pageCount: complaints.pagination.pageCount
    }
  },
  async resolvedComplaint(ctx){
    await validate(ctx.params, rule.types);
    const { user_id, resolved } = ctx.request.body;
    const { entity_type, entity_id } = ctx.params; 
    const model = entity_type === constants.rating.entity_types.room ? Room : Event;
    const existModel = await model.where({ id:entity_id }).fetch({require:true})
    if(existModel){
      const complaint = await Complaint.where({user_id, entity_id,entity_type}).fetch({
        withRelated:['creator']
      },{require:true});
      await complaint.save({ resolved }, { patch: true });
      await Mailer.resolvedMessage(complaint.related('creator').get('email'))
    }
    ctx.body = '';
  }
};

router.use(authenticated, checkRole);
router.get('/list', handler.list);
router.put('/:entity_type/banned', handler.banned);
router.get('/complaints', handler.complaints);
router.put('/:entity_type/:entity_id/complaint/resolved', handler.resolvedComplaint);

module.exports = router.routes();