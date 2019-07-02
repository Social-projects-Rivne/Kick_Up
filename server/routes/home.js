const Router = require('koa-router');
const router = new Router({ prefix: '/api' });
const { Event, Room } = require('./../models');
const { saveRole } = require('../middlewares');
const handler = {

  async home(ctx) {
  const events = await Event
  .where(qb => {
    if(ctx.state.role !== 1){
     qb.where({is_banned: false, permission: false})
    }
  })
  .orderBy('start_date','desc')
  .orderBy('members','desc')
  .fetchPage({page: 1, pageSize: 10, withRelated: ['creator','category','rating']});
    const rooms = await Room
    .where(qb => {
      if(ctx.state.role !== 1){
       qb.where({is_banned: false, permission: false})
      }
    })
    .orderBy('roomRating','desc')
    .orderBy('members','desc')
    .fetchPage({
      page: 1,
      pageSize: 10,
      withRelated: [
        'creator',
        'category',
        'rating',
        {
          'event': qb => {
            qb.where({permission: false});
          }
        }
      ]});
   
    ctx.body = {
      events,
      eventCount: events.pagination.rowCount,
      rooms,
      roomCount: rooms.pagination.rowCount
    };
  }
  
};
router.use(saveRole);
router.get('/', handler.home);

module.exports = router.routes();