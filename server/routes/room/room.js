const Router = require('koa-router');
const constants = require('./../../config/constants');
const { authenticated } = require('../../middlewares');
const MongoDbRoom = require('../../mongoDB/models/modelRoom');
const { Room, Category, Member, User } = require('../../models');
const validate = require('../../services/Validator');
const router = new Router({ prefix: '/api/room'});
const faker = require('faker');

const handler = {
  async roomList(ctx) {
    await validate(ctx.query, {
      page: 'numeric|min:1'
    });
    const { page } = ctx.query;
    const rooms = await Room.where({permission: false}).fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','event','members']});

    ctx.body = {
      rooms,
      roomCount: rooms.pagination.rowCount,
      pageCount: rooms.pagination.pageCount
    }
  },
  async createRoom(ctx){
    await validate(ctx.request.body, {
        title:'required|string|min:3|max:100',
        creator_id:'required|numeric|min:1',
        category_id:'required|numeric|min:1',
        description:'required|string|min:6|max:300',
        cover:'string|min:3',
        permission:'required|numeric|min:0',
        members_limit:'numeric|min:1',
    });
    const newRoom = {
        title,
        creator_id,
        category_id,
        description,
        cover,
        permission,
        members_limit
    } = ctx.request.body;

    const room = await new Room(newRoom).save();
    await new Member({user_id:creator_id,entity_type:constants.rating.entity_types.room,entity_id:room.id}).save();
    const resRoom = await Room.where({ id: room.id }).fetch({withRelated:['creator','category','members','event', 'media'],require:true});
    ctx.body = resRoom;
  },
  async getRoomById(ctx) {
    const { id } = ctx.params;
    const feeds = [
        {
            id: 1,
            title: "Why I Love Photography",
            description: " One hundred pictures of the same place can all look different. One picture can be interpreted in multiple ways.",
            cover: "https://farm2.staticflickr.com/1671/26239897012_d38847e42d_b.jpg"
        },
        {
            id: 2,
            title: "Photography Tips and Tricks",
            description: "Aperture Priority– Use the Aperture priority mode on your DSLR cameras or phones, to get the perfect portraits. " +
                "By entering the Aperture Priority mode, you will be in control of the depth of the picture and help you click that " +
                "perfect portrait with a blurry background.",
            cover: "http://nickjonesphoto.com/wp-content/uploads/2018/07/product-photography-best-cameras_1024x1024.png"
        }
    ];
    const gallery = [
        {
            src: "https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            thumbnail: "https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            thumbnailWidth: 320,
            thumbnailHeight: 512,
            tags: [{value: "Nature", title: "Nature"}],
            caption: "A photo by 贝莉儿 NG. (unsplash.com)"
        },
        {
            src: "http://www.markhamblin.com/graphics/siteimages/home-slideshow-4.jpg",
            thumbnail: "http://www.markhamblin.com/graphics/siteimages/home-slideshow-4.jpg",
            thumbnailWidth: 450,
            thumbnailHeight: 260,
            caption: "After Rain (Jeshu John - designerspics.com)"
        },
        {
            src: "https://i.pinimg.com/originals/e7/55/f2/e755f20eeff3cccbe59d4d6cbe4623e2.jpg",
            thumbnail: "https://i.pinimg.com/originals/e7/55/f2/e755f20eeff3cccbe59d4d6cbe4623e2.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 430,
            tags: [{value: "Nature", title: "Nature"}],
            caption: "Red Apples with other Red Fruit (foodiesfeed.com)"
        },
        {
            src: "https://images.unsplash.com/photo-1509070016581-915335454d19?ixlib=rb-1.2.1&w=1000&q=80",
            thumbnail: "https://images.unsplash.com/photo-1509070016581-915335454d19?ixlib=rb-1.2.1&w=1000&q=80",
            thumbnailWidth: 620,
            thumbnailHeight: 374,
            caption: "Boats (Jeshu John - designerspics.com)"
        },
        {
            src: "https://petapixel.com/assets/uploads/2018/07/dogphotosfeat-800x420.jpg",
            thumbnail: "https://petapixel.com/assets/uploads/2018/07/dogphotosfeat-800x420.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 174,
            caption: "286H (gratisography.com)"
        },
        {
            src: "http://animalworld.com.ua/images/2011/July/Foto/Monkey/Monkey_3.jpg",
            thumbnail: "http://animalworld.com.ua/images/2011/July/Foto/Monkey/Monkey_3.jpg",
            thumbnailWidth: 512,
            thumbnailHeight: 320,
            tags: [{value: "Animal", title: "Animal"}],
            caption: "A photo by 贝莉儿 NG. (unsplash.com)"
        },
        {
            src: "http://oakroad.net/wp-content/uploads/2016/06/being-a-photographer-professionally.jpg",
            thumbnail: "http://oakroad.net/wp-content/uploads/2016/06/being-a-photographer-professionally.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            tags: [{value: "People", title: "People"}],
            caption: "Red Apples with other Red Fruit (foodiesfeed.com)"
        },
        {
            src: "https://icdn2.digitaltrends.com/image/cory-rich-interview-photographer-shots-feat.jpg",
            thumbnail: "https://icdn2.digitaltrends.com/image/cory-rich-interview-photographer-shots-feat.jpg",
            thumbnailWidth: 620,
            thumbnailHeight: 390,
            caption: "Boats (Jeshu John - designerspics.com)"
        },
        {
            src: "https://images.fineartamerica.com/images-medium-large-5/great-smoky-mountains-national-park-nc-western-north-carolina-dave-allen.jpg",
            thumbnail: "https://images.fineartamerica.com/images-medium-large-5/great-smoky-mountains-national-park-nc-western-north-carolina-dave-allen.jpg",
            thumbnailWidth: 370,
            thumbnailHeight: 274,
        },
        {
            src: "http://mymodernmet.com/wp/wp-content/uploads/2017/11/fabio-zingg-landscape-photography-3-1.jpg",
            thumbnail: "http://mymodernmet.com/wp/wp-content/uploads/2017/11/fabio-zingg-landscape-photography-3-1.jpg",
            thumbnailWidth: 370,
            thumbnailHeight: 252,
            tags: [{value: "Nature", title: "Nature"}, {value: "Animal", title: "Animal"}],
        },
        {
            src: "https://images.designtrends.com/wp-content/uploads/2016/04/11111004/Beautiful-Travel-Background.jpg",
            thumbnail: "https://images.designtrends.com/wp-content/uploads/2016/04/11111004/Beautiful-Travel-Background.jpg",
            thumbnailWidth: 412,
            thumbnailHeight: 320,
            tags: [{value: "Nature", title: "Nature"}, {value: "People", title: "People"}],
        },
        {
            src: "https://steemitimages.com/DQmbsy3neKZAtKHCR4z8DR9zU5Ae6m6chjn2HVYMVRc8sxg/pho.jpg",
            thumbnail: "https://steemitimages.com/DQmbsy3neKZAtKHCR4z8DR9zU5Ae6m6chjn2HVYMVRc8sxg/pho.jpg",
            thumbnailWidth: 612,
            thumbnailHeight: 320,
            tags: [{value: "Nature", title: "Nature"}, {value: "People", title: "People"}],
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
        },
        {
            id: 2,
            title: "Photo Festival",
            description: "This is a 3-day creative event with training, networking, and opportunities to meet instructors in the " +
                "photography and design industries.",
            cover: "https://images.unsplash.com/photo-1516807947649-1054add6bc97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        }
    ];
    const members = [
        {
            id: 1,
            avatar: "http://www.casoviengleskogonline.com/images/klijenti/avatar-homme.png",
            first_name: "Weree",
            last_name: "Avram"
        },
        {
            id: 2,
            avatar: "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
            first_name: "Lorem",
            last_name: "Vasia"
        },
        {
            id: 3,
            avatar: "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-04-512.png",
            first_name: "Ipsum",
            last_name: "Kolia"
        },
        {
            id: 4,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuX8DpuDiUuFAMWfXKVW6P9X6VOvIGjPzuzXy0QTTmfBiAmfn",
            first_name: "Virat",
            last_name: "Kohli"
        }
    ];
    const room = await Room.where({ id }).fetch({withRelated:['creator','category','members','event', 'media'],require:true});
    room.set({feeds,posts});
    ctx.body = room;
  },
  async updateRoomById(ctx) {
      await validate(ctx.request.body, {
          title:'required|string|min:3|max:100',
          description:'required|string|min:6|max:300',
          members_limit:'numeric|min:1',
      });
      const { id } = ctx.params;
      const room = await Room.where({id}).fetch({require:true});
      const { title,description,cover,permission,members_limit,category_id } = ctx.request.body;
      const obj = {title,description,cover,permission,members_limit,category_id};
      await room.save( obj, { patch:true });
      ctx.body = '';
  },
  async sort(ctx) {
    let { sort, page } = ctx.query;
    await validate(ctx.query, {
      page: 'numeric|min:1'
    });
    let rooms = [];

    switch(sort) {
      case 'rate':
        rooms = await Room.query(qb => qb.orderBy('roomRating','DESC'))
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
        break;
      case 'members':
        rooms = await Room.query(qb => qb.orderBy('members','DESC'))
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
        break;
      case 'create':
        rooms = await Room.query(qb => qb.orderBy('created_at','DESC'))
        .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
        break;
    }
    ctx.body = {
      rooms,
      roomCount: rooms.pagination.rowCount,
      pageCount: rooms.pagination.pageCount
    };
  },
  async filter(ctx) {
    const filter = ctx.query;
    const { page } = ctx.query;
    await validate(ctx.query, {
      page: 'numeric|min:1'
    });
    let filterRooms = [];
    if(filter.date && filter.category) {
      const subquery = await Category.where({title: filter.category}).fetch();
      const initialDate = filter.date.slice(0, 10) + 'T00:00:00.000Z';
      const finalDate = filter.date.slice(0, 10) + 'T23:59:59.000Z';
      filterRooms = await Room.query(qb => qb.whereBetween('created_at', [initialDate, finalDate])).where({ category_id: subquery.id })
                            .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
    } else if (!filter.date && filter.category) {
        const subquery = await Category.where({title: filter.category}).fetch();
        filterRooms = await Room.where({ category_id: subquery.id }).fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
      } else if (filter.date && !filter.category){
          const initialDate = filter.date.slice(0, 10) + 'T00:00:00.000Z';
          const finalDate = filter.date.slice(0, 10) + 'T23:59:59.000Z';
          filterRooms = await Room.query(qb => qb.whereBetween('created_at', [initialDate, finalDate]))
            .fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
        } else {
            filterRooms = await Room.fetchPage({page, pageSize:constants.pageSize, withRelated: ['creator','category','rating','members']});
          }
    ctx.body = {
      rooms: filterRooms,
      roomCount: filterRooms.pagination.rowCount,
      pageCount: filterRooms.pagination.pageCount
    };
  },
  async addPost(ctx) {
    const type = 'member';
    const { authorId, roomId, text, title, isPinned } = ctx.request.body;

    // Validate input;
    await validate(ctx.request.body, {
      authorId: 'numeric|min:1',
      roomId: 'numeric|min:1',
      text: 'required',
      title: 'min:3',
      isPinned: 'boolean'
    });

    let room = await MongoDbRoom.findOne({room_id: roomId});
    
    if (room) {
      room.posts.push({
        authorId,
        title,
        text,    
        comments: [],
        isPinned
      });
    } else {
      room = new MongoDbRoom(
        {
          room_id: roomId,
          posts: [
            {
              authorId,
              title,
              text,
              comments: [],
              isPinned
            }
          ],
          moderators_list: [],
          gallery: [],
          tags: [],
          members: [],
          ratings: []
        }
      );
    }

    const res = await room.save();
    ctx.body = '';
  },
  async getRoomPostsById(ctx) {    
    const getUserData = async function(ids) {
      let res = null;
      
      // Get data;
      if (Array.isArray(ids) && ids.length > 0) {
        res = await User.where(qb => {
          qb.whereIn('id', ids);
        }).fetchAll({required:true});

        if (res) {
          res = res.serialize().map(el => {
            return {
              id: el.id,
              firstName: el.first_name,
              lastName: el.last_name,
              avatar: el.avatar
            }
          });
        }
      }

      return res;
    };
    
    let { id:roomId } = ctx.params;
    roomId = parseInt(roomId);

    await validate({roomId}, {
      roomId: 'numeric|min:1',
    });

    // Retrieve posts;
    let roomPosts = await MongoDbRoom.findOne({room_id: roomId});
    
    // Get user data for each post;
    if (roomPosts) {

      // Convert mongoose array to array;
      roomPosts = roomPosts.posts.map(post => post.toObject());

      // Query MySQL for users details;
      let ids = roomPosts.map(post => post.authorId);
      let usersData = await getUserData(ids);

      if (usersData) {
        //Add received data to MongoDB data;
        roomPosts.forEach((post)  => {
          let filteredUserData = usersData.find(item => item.id === post.authorId);
          
          if (filteredUserData) {
            post.author_details = {
              firstName : filteredUserData.firstName,
              lastName : filteredUserData.lastName,
              avatar : filteredUserData.avatar
            };
          }
        });
      }
    }

    // Return posts;
    ctx.body = roomPosts ? roomPosts : []; 
  },
  async updatePost(ctx) {
    const {title, text, isPinned, postId} = ctx.request.body;
    const { id } = ctx.params;
    let dataToValidate = {};

    // Validate input;
    if (title) dataToValidate.title = title;
    if (text) dataToValidate.text = text;
    if (typeof isPinned === 'boolean') dataToValidate.isPinned = isPinned;

    await validate(dataToValidate, {
      text: 'string',
      title: 'string|min:3',
      isPinned: 'boolean'
    });
    
    // Perform DB data update;
    try {
      let res = await MongoDbRoom.findOneAndUpdate({'posts._id': postId}, 
      {
        '$set': (() => {
          // Fill with data for update;
          let res = {};
  
          if (title) res['posts.$.title'] =  title;
          if (text) res['posts.$.text'] = text;
          if (typeof isPinned === 'boolean') res['posts.$.isPinned'] = isPinned;
  
          return res;
        })()
      });
    } catch(err) {
      ctx.throwSingle('Could not save post, please reload your page', 400);
    } 

    ctx.body = '';
  }
};

// router.post("/add-post", (ctx) => {
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
router.post('/', handler.createRoom);
router.get('/sort', handler.sort);
router.get('/filter', handler.filter);
router.post('/new-post', authenticated, handler.addPost);
router.get('/:id', handler.getRoomById);
router.put('/:id', handler.updateRoomById);
router.get('/:id/posts', handler.getRoomPostsById);
router.put('/:id/updatePost', authenticated, handler.updatePost);

module.exports = router.routes();