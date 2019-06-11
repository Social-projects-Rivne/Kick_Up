const Router = require('koa-router');
const router = new Router({ prefix: '/api' });
const { Rating, Room, Event } = require('./../../models');
const validate = require('../../services/Validator');
const constants = require('./../../config/constants');
const entity_types = Object.values(constants.rating.entity_types);
const { authenticated } = require('./../../middlewares');
const handler = {

  async ratingList(ctx) {
    const ratingList = await Rating.fetchAll();
    ctx.body = ratingList;
  },
  async crateRating(ctx) {
    await validate({ ...ctx.params, ...ctx.request.body }, {
      entity_type: `required|string|in:${entity_types.join()}`,
      rating: 'required|numeric|min:0|max:5',
      entity_id: 'required|numeric|min:1'
    })
    const { user_id } = ctx.state;
    const { rating } = ctx.request.body;
    const { entity_type, entity_id } = ctx.params;
    let entityExists;
    let userRating = 0;
    if (entity_type === constants.rating.entity_types.room) {
      entityExists = await Room.where({ id: entity_id }).count();
    } else {
      entityExists = await Event.where({ id: entity_id }).count();
    }
    if (!entityExists) {
      ctx.throwSingle(`${entity_type} not found`, 404);
    }
    const getRating = await Rating.where({ user_id, entity_type, entity_id }).fetch();
    if (getRating) {
      userRating = await getRating.save({ rating }, { patch: true });
    } else {
      userRating = await new Rating({ user_id, rating, entity_type, entity_id }).save();
    }
    ctx.body = {
      rating: userRating.get('rating')
    };
  }

};

router.use(authenticated);
router.get('/rating', handler.ratingList);
router.post('/:entity_type/:entity_id/rating', handler.crateRating);

module.exports = router.routes();
