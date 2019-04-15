const Router = require('koa-router');
const router = new Router();
const Room = require("./../mongoDB/models/modelRoom");
const rooms = require('./../mocks/rooms.json');

router.post("/save-room", (ctx) => {
  const {
    room_id,
    moderators_list,
    gallery,
    tags,
    room_information
  } = ctx.request.body;
  let newRoom = new Room();
  if (
    !room_id ||
    !moderators_list ||
    !gallery ||
    !tags ||
    !weight ||
    !room_information
  ) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  newRoom.room_id = room_id;
  newRoom.comments = [];
  newRoom.moderators_list = moderators;
  newRoom.gallery = photos;
  newRoom.tags = tags;
  newRoom.members = [];
  newRoom.room_information = information;
  newRoom.ratings = [];
  newRoom.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
  const { hello } = ctx.request.body;
  ctx.body = hello;
});

// router.get("/", (ctx) => {
//   Room.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, roomData: data });
//   });
//   ctx.body = "hello world";
// });

router.get("/", (ctx) => {
  console.log('rooms json', rooms)
  // Room.find((err, data) => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true, roomData: data });
  // });
  ctx.body = "hello world";
});

module.exports = router.routes();
