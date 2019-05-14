const Router = require('koa-router');
const constants = require('./../../config/constants');
const router = new Router({prefix: '/api/event'});
const { Event, Category, Member } = require('../../models');
const validate = require('../../services/Validator');
const handler = {

  async eventList(ctx) {
    await validate(ctx.query, {
      page: 'numeric|min:1'
    });
  const { page } = ctx.query;
  const events = await Event.where({permission: false}).fetchPage({page, pageSize: constants.pageSize, withRelated: ['creator','category','rating','members']})
  ctx.body = {
    events,
    eventCount: events.pagination.rowCount,
    pageCount: events.pagination.pageCount
  };
  },

  async sort(ctx) {
    let { sort, page } = ctx.query;
    console.log('sort', sort);
    await validate(ctx.query, {
      page: 'numeric|min:1'
    });
    let events = [];

    switch(sort) {
      case 'rate':
        events = await Event.query(qb => qb.orderBy('roomRating','DESC'))
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
        break;
      case 'members':
        events = await Event.query(qb => qb.orderBy('members','DESC'))
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
        break;
      case 'start':
        events = await Event.query(qb => qb.orderBy('start_date'))
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
        break;
    }
    ctx.body = {
      events,
      eventCount: events.pagination.rowCount,
      pageCount: events.pagination.pageCount
    };
  },

  async filter(ctx) {
    const filter = ctx.request.query;
    const { page } = ctx.query;
    await validate(ctx.query, {
      page: 'numeric|min:1'
    });
    let filterEvents = [];
    if (filter.date && filter.category && filter.location) {
      console.log('1')
      const initialDate = filter.date.slice(0, 10) + 'T00:00:00.000Z';
      const finalDate = filter.date.slice(0, 10) + 'T23:59:59.000Z';
      const subquery = await Category.where({title: filter.category}).fetch();
      filterEvents = await Event.query(qb => qb.whereBetween('start_date', [initialDate, finalDate]))
        .where({ category_id: subquery.id, location: filter.location })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (!filter.date && filter.category && filter.location) {
      console.log('2')
      const subquery = await Category.where({title: filter.category}).fetch();
        filterEvents = await Event.where({ category_id: subquery.id, location: filter.location })
          .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (filter.date && !filter.category && filter.location){
      console.log('3')
      const initialDate = filter.date.slice(0, 10) + 'T00:00:00.000Z';
      const finalDate = filter.date.slice(0, 10) + 'T23:59:59.000Z';
      filterEvents = await Event.query(qb => qb.whereBetween('start_date', [initialDate, finalDate]))
        .where({ location: filter.location })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (!filter.date && !filter.category && filter.location){
      console.log('4')
      filterEvents = await Event.where({ location: filter.location })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (filter.date && filter.category && !filter.location){
      console.log('5')
      const subquery = await Category.where({title: filter.category}).fetch();
      const initialDate = filter.date.slice(0, 10) + 'T00:00:00.000Z';
      const finalDate = filter.date.slice(0, 10) + 'T23:59:59.000Z';
      filterEvents = await Event.query(qb => qb.whereBetween('start_date', [initialDate, finalDate]))
        .where({ category_id: subquery.id })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (!filter.date && filter.category && !filter.location){
      console.log('6')
      const subquery = await Category.where({title: filter.category}).fetch();
      filterEvents = await Event.where({ category_id: subquery.id })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (filter.date && !filter.category && !filter.location){
      console.log('7')
      const initialDate = filter.date.slice(0, 10) + 'T00:00:00.000Z';
      const finalDate = filter.date.slice(0, 10) + 'T23:59:59.000Z';
      filterEvents = await Event.query(qb => qb.whereBetween('start_date', [initialDate, finalDate]))
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else {
    filterEvents = await Event.fetchPage({page, pageSize: constants.pageSize, withRelated: ['creator','category','rating','members']});
    }
    ctx.body = {
      events: filterEvents,
      eventCount: filterEvents.pagination.rowCount,
      pageCount: filterEvents.pagination.pageCount
    };
  },
  async createEvent(ctx){
    await validate(ctx.request.body, {
        title:'required|string|min:3|max:100',
        creator_id:'required|numeric|min:1',
        category_id:'required|numeric|min:1',
        room_id:'required|numeric|min:1',
        description:'required|string|min:6|max:300',
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
    const event = await new Event(newEvent).save();
    await new Member({user_id:creator_id,entity_type:constants.rating.entity_types.event,entity_id:event.id}).save();
    ctx.body = event;
  },
  async getEventById(ctx) {
    const { id } = ctx.params;
    const room = await Event.where({ id }).fetch({withRelated:['creator','category','members'],require:true})
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
router.get('/sort', handler.sort);
router.get('/filter', handler.filter);
router.get('/:id', handler.getEventById);
router.post('/', handler.createEvent);
router.put('/:id', handler.updateEventById);
module.exports = router.routes();
