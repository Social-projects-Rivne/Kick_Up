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
    const feeds = [
      {
        id: 1,
        title: "Why I Love Photography",
        description: " One hundred pictures of the same place can all look different. One picture can be interpreted in multiple ways.",
        cover: "https://farm2.staticflickr.com/1671/26239897012_d38847e42d_b.jpg"
      }
    ];
    const events = [
      {
        id: 1,
        title: "Photo Booth Expo",
        description: "This event is the largest trade show for photo booth professionals, manufacturers, and suppliers. " +
            "At the event, new products and concepts are revealed and professionals come together for seminars, " +
            "networking, parties, and entertainment. ",
        cover: "https://cherrycross.com/wp-content/uploads/2016/06/Event-Photography.jpg",
        date: "24/05/2019",
        location: "Las Vegas, Nevada"
      }
    ];
    const gallery = [
      {
        src: "https://png.pngtree.com/thumb_back/fw800/back_pic/03/72/07/1757b88555c5555.jpg",
        thumbnail: "https://png.pngtree.com/thumb_back/fw800/back_pic/03/72/07/1757b88555c5555.jpg",
        thumbnailWidth: 520,
        thumbnailHeight: 274,
        caption: "286H (gratisography.com)"
      }
    ];
    const posts = [
      {
        id: 1,
        title: "Photography Tips and Tricks",
        description: "Apps to the rescue– There mobile apps like Camera Awesome and Camera+ available in your " +
            "App store or Play store which enable you to enhance the pictures taken on your smartphone. " +
            "However, these apps do not offer all professional capabilities of a DSLR camera, these apps can be " +
            "used for a new level of picture taking, by just using your smartphone.",
        cover: "https://dx.lnwfile.com/_/dx/_raw/dh/ls/q5.jpg"
      }
    ];
    const members = [
      {
        id: 1,
        avatar: "http://www.casoviengleskogonline.com/images/klijenti/avatar-homme.png",
        first_name: "Weree",
        last_name: "Avram"
      }
    ];
    const room = await Room.where({ id }).fetch({withRelated:['creator','category'],require:true})
    room.set({feeds,events,gallery,posts,members});
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
