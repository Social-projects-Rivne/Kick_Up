const Router = require('koa-router');
const constants = require('./../../config/constants');
const router = new Router({prefix: '/api/event'});
const { Event, Category, Member } = require('../../models');
const validate = require('../../services/Validator');
const { authenticated, saveRole } = require('./../../middlewares');
const handler = {

  async eventList(ctx) {
    await validate(ctx.query, {
      page: 'numeric|min:1'
    });
  const { page } = ctx.query;

  const events = await Event.query(db => {
      if(ctx.state.role !== 1){
        db.leftJoin('rooms', 'rooms.id', 'events.room_id')
        .where( perm => perm.where({ 'room_id': null, 'events.permission': false }))
        .orWhere( perm => perm.where({ 'rooms.permission': false, 'events.permission': false}))
        }
      }
      ).fetchPage({page, pageSize: constants.pageSize, withRelated: ['creator','category','rating','members']});
  ctx.body = {
    events,
    eventCount: events.pagination.rowCount,
    pageCount: events.pagination.pageCount
  };
  },

  async sort(ctx) {
    let { sort, page } = ctx.query;
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
      const initialDate = filter.date.slice(0, 10) + 'T00:00:00.000Z';
      const finalDate = filter.date.slice(0, 10) + 'T23:59:59.000Z';
      const subquery = await Category.where({title: filter.category}).fetch();
      filterEvents = await Event.query(qb => qb.whereBetween('start_date', [initialDate, finalDate]))
        .where({ category_id: subquery.id, location: filter.location })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (!filter.date && filter.category && filter.location) {
      const subquery = await Category.where({title: filter.category}).fetch();
        filterEvents = await Event.where({ category_id: subquery.id, location: filter.location })
          .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (filter.date && !filter.category && filter.location){
      const initialDate = filter.date.slice(0, 10) + 'T00:00:00.000Z';
      const finalDate = filter.date.slice(0, 10) + 'T23:59:59.000Z';
      filterEvents = await Event.query(qb => qb.whereBetween('start_date', [initialDate, finalDate]))
        .where({ location: filter.location })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (!filter.date && !filter.category && filter.location){
      filterEvents = await Event.where({ location: filter.location })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (filter.date && filter.category && !filter.location){
      const subquery = await Category.where({title: filter.category}).fetch();
      const initialDate = filter.date.slice(0, 10) + 'T00:00:00.000Z';
      const finalDate = filter.date.slice(0, 10) + 'T23:59:59.000Z';
      filterEvents = await Event.query(qb => qb.whereBetween('start_date', [initialDate, finalDate]))
        .where({ category_id: subquery.id })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (!filter.date && filter.category && !filter.location){
      const subquery = await Category.where({title: filter.category}).fetch();
      filterEvents = await Event.where({ category_id: subquery.id })
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (filter.date && !filter.category && !filter.location){
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
        room_id:'numeric|min:1',
        description:'required|string|min:6|max:300',
        location:'required|string|min:3',
        permission:'required|numeric|min:0',
        members_limit:'numeric|min:1'
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
    const event = await Event.where({ id }).fetch({withRelated:['creator','category','members', 'media'],require:true});
    ctx.body = event;
  },
  async updateEventById(ctx) {
    await validate(ctx.request.body, {
      title:'required|string|min:3|max:100',
      description:'required|string|min:6|max:300',
      members_limit:'numeric|min:1',
    });
    const { id } = ctx.params;
    const event =  await Event.where({id}).fetch({require:true});
    const { title,description,cover,permission,members_limit,category_id, start_date, location } = ctx.request.body;
    const obj = {title,description,cover,permission,members_limit,category_id, start_date, location};
    await event.save( obj, { patch:true });
    ctx.body = '';
  }
  
};

router.get('/', handler.eventList);
router.get('/sort', handler.sort);
router.get('/filter', handler.filter);
router.get('/:id', handler.getEventById);
router.post('/', authenticated, handler.createEvent);
router.put('/:id',authenticated, handler.updateEventById);
module.exports = router.routes();
