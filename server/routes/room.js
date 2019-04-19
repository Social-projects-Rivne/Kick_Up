const Router = require('koa-router');
// const Room = require("./../mongoDB/models/modelRoom");
const { Room } =require('./../models')
const validate = require('./../services/Validator');
const router = new Router({ prefix: '/api/room'});


const handler = {
  async roomList(ctx) {
    const list = await Room.fetchAll({withRelated: ['creator','category']})
    ctx.body = list;
  },
  async createRoom(ctx){
      await validate(ctx.request.body, {
          title:'required|string|min:3',
          creator_id:'required|numeric|min:1',
          category_id:'required|numeric|min:1',
          description:'required|string|min:6',
          cover:'string|min:3',
          permission:'required|numeric|min:0',
          members_limit:'numeric|min:1',
      })
      const newRoom = {
          title,
          creator_id,
          category_id,
          description,
          cover,
          permission,
          members_limit
      } = ctx.request.body;
      await new Room(newRoom).save();
      ctx.body = ''
    ctx.body = '';
  },
  async getRoomById(ctx) {
    const { id } = ctx.params;
    const room = await Room.where({ id }).fetch({withRelated:['creator','category'],require:true})
    ctx.body = room;
  },
  async updateRoomById(ctx) {
    const { id } = ctx.params;
    const room = await Room.where({id}).fetch({require:true});
    const { title,description,cover,permission,members_limit,category_id } = ctx.request.body;
    const obj = {title,description,cover,permission,members_limit,category_id};
    await room.save( obj, { patch:true });
    ctx.body = '';
  }
}
// router.post("/save-room", (ctx) => {
//   const {
//     room_id,
//     moderators_list,
//     gallery,
//     tags,
//     room_information
//   } = ctx.request.body;
//   let newRoom = new Room();
//   if (
//     !room_id ||
//     !moderators_list ||
//     !gallery ||
//     !tags ||
//     !weight ||
//     !room_information
//   ) {
//     return res.json({
//       success: false,
//       error: "INVALID INPUTS"
//     });
//   }
//   newRoom.room_id = room_id;
//   newRoom.comments = [];
//   newRoom.moderators_list = moderators;
//   newRoom.gallery = photos;
//   newRoom.tags = tags;
//   newRoom.members = [];
//   newRoom.room_information = information;
//   newRoom.ratings = [];
//   newRoom.save(err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
//   const { hello } = ctx.request.body;
//   ctx.body = hello;
// });

// router.get("/", (ctx) => {
//   Room.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, roomData: data });
//   });
//   ctx.body = "hello world";
// });


router.get('/', handler.roomList);
router.get('/:id', handler.getRoomById);
router.post('/', handler.createRoom);
router.put('/:id', handler.updateRoomById);
module.exports = router.routes();
