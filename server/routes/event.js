const Router = require('koa-router');
const router = new Router({prefix: '/api/event'});
const { Event } = require('./../models');
const validate = require('./../services/Validator');

const handler = {

  async eventList(ctx) {
  const list = await Event.fetchAll({withRelated: ['creator','category']})
  ctx.body = list;
  },
  async createEvent(ctx){
    await validate(ctx.request.body, {
        title:'required|string|min:3',
        creator_id:'required|numeric|min:1',
        category_id:'required|numeric|min:1',
        room_id:'required|numeric|min:1',
        description:'required|string|min:6',
        location:'required|string|min:3',
        permission:'required|numeric|min:0',
        members_limit:'numeric|min:1',
    })
    const newEvent = {
        title,
        creator_id,
        category_id,
        room_id,
        description,
        location,
        permission,
        members_limit
    } = ctx.request.body;
    await new Event(newEvent).save();
    ctx.body = ''
  },
  async getEventById(ctx) {
    const { id } = ctx.params;
    const room = await Event.where({ id }).fetch({withRelated:['creator','category'],require:true})
    ctx.body = room;
  },
  async updateEventById(ctx) {
    const { id } = ctx.params;
    const event =  await Event.where({id}).fetch({require:true});
    const { title,description,cover,permission,members_limit,category_id, start_date } = ctx.request.body;
    const obj = {title,description,cover,permission,members_limit,category_id, start_date};
    await event.save( obj, { patch:true });
    ctx.body = '';
  }
  
};

// const Event = require("./../mongoDB/models/modelEvent");

// router.post("/save-event", (ctx) => {
//   const { event_id, moderators_list, tags } = ctx.request.body;
//   let newEvent = new Event();
//   if (!event_id || !moderators_list || !tags) {
//     ctx.throwSingle("INVALID INPUTS", 404)
//   }
//   (newEvent.event_id = event_id),
//     (newEvent.comments = []),
//     (newEvent.moderators_list = moderators_list),
//     (newEvent.gallery = []),
//     (newEvent.tags = tags),
//     (newEvent.members = []),
//     (newEvent.ratings = []);
//   newEvent.save(err => {
//     if (err) return ctx.throwSingle(err, 500)
//     return ctx.body = { success: true };
//   });
// });

// router.get("/", (ctx) => {
//   Event.find((err, data) => {
//     if (err) return ctx.throwSingle(err, 500)
//     ctx.body = { 
//       success: true,
//       eventData: data
//      };
//   });
// });

router.get('/', handler.eventList);
router.get('/:id', handler.getEventById);
router.post('/', handler.createEvent);
router.put('/:id', handler.updateEventById);
module.exports = router.routes();
