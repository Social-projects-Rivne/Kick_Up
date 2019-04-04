const Router = require('koa-router');
const router = new Router();

const Event = require("./../mongoDB/models/modelEvent");

router.post("/save-event", (req, res) => {
  const { event_id, moderators_list, tags } = req.body;
  let newEvent = new Event();
  if (!event_id || !moderators_list || !tags) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  (newEvent.event_id = event_id),
    (newEvent.comments = []),
    (newEvent.moderators_list = moderators_list),
    (newEvent.gallery = []),
    (newEvent.tags = tags),
    (newEvent.members = []),
    (newEvent.ratings = []);
  newEvent.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get("/", (req, res) => {
  Event.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, eventData: data });
  });
});

module.exports = router.routes();
