const faker = require('faker');

const categories = [
  {
    id: 1,
    title: 'Music'
  },
  {
    id: 2,
    title: 'Beers'
  },
  {
    id: 3,
    title: 'Games'
  },
  {
    id: 4,
    title: 'Dancing'
  },
  {
    id: 5,
    title: 'Others'
  }
];
const tags = [
  {
    id: 1,
    title: 'Nature'
  },
  {
    id: 2,
    title: 'Birds'
  },
  {
    id: 3,
    title: 'Games'
  },
  {
    id: 4,
    title: 'Beer'
  }
];
const ratings = [
  {
    id: 1,
    user_id: 1,
    entity_type: 'room',
    rating: faker.random.number({min:1,max:5}),
    entity_id: 1
  },
  {
    id: 2,
    user_id: 2,
    entity_type: 'room',
    rating: faker.random.number({min:1,max:5}),
    entity_id: 2
  },
  {
    id: 3,
    user_id: 3,
    entity_type: 'room',
    rating: faker.random.number({min:1,max:5}),
    entity_id: 3
  },
  {
    id: 4,
    user_id: 4,
    entity_type: 'room',
    rating: faker.random.number({min:1,max:5}),
    entity_id: 4
  },
  {
    id: 5,
    user_id: 1,
    entity_type: 'event',
    rating: faker.random.number({min:1,max:5}),
    entity_id: 1
  },
  {
    id: 6,
    user_id: 2,
    entity_type: 'event',
    rating: faker.random.number({min:1,max:5}),
    entity_id: 2
  },
  {
    id: 7,
    user_id: 3,
    entity_type: 'event',
    rating: faker.random.number({min:1,max:5}),
    entity_id: 3
  },
  {
    id: 8,
    user_id: 4,
    entity_type: 'event',
    rating: faker.random.number({min:1,max:5}),
    entity_id: 4
  }
];
const users = [
  {
    id: 1,
    nick: `${faker.name.findName()}`,
    first_name: `${faker.name.firstName()}`,
    last_name: `${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: 1,
    avatar: faker.image.avatar(),
    carma: 123,
    role: 2,
    is_banned: false,
  },
  {
    id: 2,
    nick: `${faker.name.findName()}`,
    first_name: `${faker.name.firstName()}`,
    last_name: `${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: 1,
    avatar: faker.image.avatar(),
    carma: 123,
    role: 2,
    is_banned: false,
  },
  {
    id: 3,
    nick: `${faker.name.findName()}`,
    first_name: `${faker.name.firstName()}`,
    last_name: `${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: 1,
    avatar: faker.image.avatar(),
    carma: 123,
    role: 2,
    is_banned: false,
  },
  {
    id: 4,
    nick: `${faker.name.findName()}`,
    first_name: `${faker.name.firstName()}`,
    last_name: `${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: 1,
    avatar: faker.image.avatar(),
    carma: 123,
    role: 2,
    is_banned: false,
  }
];
const rooms = [
  {
    id: 1,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac tincidunt nisl. Fusce viverra lacus est, vitae ultricies nulla porttitor non. Proin eleifend, orci eu pulvinar finibus, sapien mi scelerisque massa, feugiat tincidunt leo lectus ac arcu. Etiam feugiat vulputate mi. Sed leo mauris, rhoncus sit amet eleifend nec, volutpat id neque. Pellentesque iaculis hendrerit mollis. Aliquam eros turpis, vehicula rhoncus faucibus ac, porttitor quis sem. Sed neque mi, aliquet et ipsum et.',
    cover: "https://picsum.photos/200/300/?random",
    members_limit: 25,
    members: faker.random.number({min:1,max:15}),
    roomRating: faker.random.number({min:1,max:5}),
    is_banned: 0
  },
  {
    id: 2,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac tincidunt nisl. Fusce viverra lacus est, vitae ultricies nulla porttitor non. Proin eleifend, orci eu pulvinar finibus, sapien mi scelerisque massa, feugiat tincidunt leo lectus ac arcu. Etiam feugiat vulputate mi. Sed leo mauris, rhoncus sit amet eleifend nec, volutpat id neque. Pellentesque iaculis hendrerit mollis. Aliquam eros turpis, vehicula rhoncus faucibus ac, porttitor quis sem. Sed neque mi, aliquet et ipsum et.',
    cover: "https://picsum.photos/200/300/?random",
    members_limit: 25,
    members: faker.random.number({min:1,max:15}),
    roomRating: faker.random.number({min:1,max:5}),
    is_banned: 0
  },
  {
    id: 3,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac tincidunt nisl. Fusce viverra lacus est, vitae ultricies nulla porttitor non. Proin eleifend, orci eu pulvinar finibus, sapien mi scelerisque massa, feugiat tincidunt leo lectus ac arcu. Etiam feugiat vulputate mi. Sed leo mauris, rhoncus sit amet eleifend nec, volutpat id neque. Pellentesque iaculis hendrerit mollis. Aliquam eros turpis, vehicula rhoncus faucibus ac, porttitor quis sem. Sed neque mi, aliquet et ipsum et.',
    cover: "https://picsum.photos/200/300/?random",
    members_limit: 25,
    members: faker.random.number({min:1,max:15}),
    roomRating: faker.random.number({min:1,max:5}),
    is_banned: 0
  },
  {
    id: 4,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac tincidunt nisl. Fusce viverra lacus est, vitae ultricies nulla porttitor non. Proin eleifend, orci eu pulvinar finibus, sapien mi scelerisque massa, feugiat tincidunt leo lectus ac arcu. Etiam feugiat vulputate mi. Sed leo mauris, rhoncus sit amet eleifend nec, volutpat id neque. Pellentesque iaculis hendrerit mollis. Aliquam eros turpis, vehicula rhoncus faucibus ac, porttitor quis sem. Sed neque mi, aliquet et ipsum et.',
    cover: "https://picsum.photos/200/300/?random",
    permission: 1,
    members_limit: 25,
    members: faker.random.number({min:1,max:15}),
    roomRating: faker.random.number({min:1,max:5}),
    is_banned: 0
  },
];
const members = [
  {
    id:1,
    user_id: 1,
    entity_type: 'room',
    entity_id: 1
  },
  {
    id:2,
    user_id: 2,
    entity_type: 'room',
    entity_id: 1
  },
  {
    id:3,
    user_id: 3,
    entity_type: 'room',
    entity_id: 2
  },
  {
    id:4,
    user_id: 4,
    entity_type: 'room',
    entity_id: 2
  },
  {
    id:5,
    user_id: 1,
    entity_type: 'event',
    entity_id: 1
  },
  {
    id:6,
    user_id: 2,
    entity_type: 'event',
    entity_id: 1
  },
  {
    id:7,
    user_id: 3,
    entity_type: 'event',
    entity_id: 2
  },
  {
    id:8,
    user_id: 4,
    entity_type: 'event',
    entity_id: 2
  }
]
const events = [
  {
    id: 1,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    room_id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac tincidunt nisl. Fusce viverra lacus est, vitae ultricies nulla porttitor non. Proin eleifend, orci eu pulvinar finibus, sapien mi scelerisque massa, feugiat tincidunt leo lectus ac arcu. Etiam feugiat vulputate mi. Sed leo mauris, rhoncus sit amet eleifend nec, volutpat id neque. Pellentesque iaculis hendrerit mollis. Aliquam eros turpis, vehicula rhoncus faucibus ac, porttitor quis sem. Sed neque mi, aliquet et ipsum et.',
    cover: faker.image.nature(),
    location: faker.random.locale(),
    start_date: faker.date.future(),
    members_limit: 25,
    members: faker.random.number({min:1,max:15}),
    eventRating: faker.random.number({min:1,max:5}),
    is_banned: 0
  },
  {
    id: 2,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    room_id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac tincidunt nisl. Fusce viverra lacus est, vitae ultricies nulla porttitor non. Proin eleifend, orci eu pulvinar finibus, sapien mi scelerisque massa, feugiat tincidunt leo lectus ac arcu. Etiam feugiat vulputate mi. Sed leo mauris, rhoncus sit amet eleifend nec, volutpat id neque. Pellentesque iaculis hendrerit mollis. Aliquam eros turpis, vehicula rhoncus faucibus ac, porttitor quis sem. Sed neque mi, aliquet et ipsum et.',
    cover: faker.image.nature(),
    location: faker.random.locale(),
    permission: 1,
    start_date: faker.date.future(),
    members_limit: 25,
    members: faker.random.number({min:1,max:15}),
    eventRating: faker.random.number({min:1,max:5}),
    is_banned: 0
  },
  {
    id: 3,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    room_id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac tincidunt nisl. Fusce viverra lacus est, vitae ultricies nulla porttitor non. Proin eleifend, orci eu pulvinar finibus, sapien mi scelerisque massa, feugiat tincidunt leo lectus ac arcu. Etiam feugiat vulputate mi. Sed leo mauris, rhoncus sit amet eleifend nec, volutpat id neque. Pellentesque iaculis hendrerit mollis. Aliquam eros turpis, vehicula rhoncus faucibus ac, porttitor quis sem. Sed neque mi, aliquet et ipsum et.',
    cover: faker.image.nature(),
    location: faker.random.locale(),
    permission: 1,
    start_date: faker.date.future(),
    members_limit: 25,
    members: faker.random.number({min:1,max:15}),
    eventRating: faker.random.number({min:1,max:5}),
    is_banned: 0
  },
  {
    id: 4,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac tincidunt nisl. Fusce viverra lacus est, vitae ultricies nulla porttitor non. Proin eleifend, orci eu pulvinar finibus, sapien mi scelerisque massa, feugiat tincidunt leo lectus ac arcu. Etiam feugiat vulputate mi. Sed leo mauris, rhoncus sit amet eleifend nec, volutpat id neque. Pellentesque iaculis hendrerit mollis. Aliquam eros turpis, vehicula rhoncus faucibus ac, porttitor quis sem. Sed neque mi, aliquet et ipsum et.',
    cover: faker.image.nature(),
    location: faker.random.locale(),
    permission: 1,
    start_date: faker.date.future(),
    members_limit: 25,
    members: faker.random.number({min:1,max:15}),
    eventRating: faker.random.number({min:1,max:5}),
    is_banned: 0
  }
];



exports.seed = async knex => {
  await knex('users').insert(users);
  await knex('categories').insert(categories);
  await knex('rooms').insert(rooms);
  await knex('events').insert(events);
  await knex('tags').insert(tags);
  await knex('ratings').insert(ratings);
  await knex('members').insert(members);
};

exports.seedData = {
  users,
  categories,
  rooms,
  events,
  tags,
  ratings,
  members
};
