const Router = require('koa-router');
const router = new Router();

const Event = require("./../mongoDB/models/modelEvent");

router.post("/save-event", (ctx) => {
  const { event_id, moderators_list, tags } = ctx.request.body;
  let newEvent = new Event();
  if (!event_id || !moderators_list || !tags) {
    ctx.throwSingle("INVALID INPUTS", 404)
  }
  (newEvent.event_id = event_id),
    (newEvent.comments = []),
    (newEvent.moderators_list = moderators_list),
    (newEvent.gallery = []),
    (newEvent.tags = tags),
    (newEvent.members = []),
    (newEvent.ratings = []);
  newEvent.save(err => {
    if (err) return ctx.throwSingle(err, 500)
    return ctx.body = { success: true };
  });
});

router.get("/", (ctx) => {
  Event.find((err, data) => {
    if (err) return ctx.throwSingle(err, 500)
    ctx.body = { 
      success: true,
      eventData: data
     };
  });
});

module.exports = router.routes();
