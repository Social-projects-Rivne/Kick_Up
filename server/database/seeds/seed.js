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
const users = [
  {
    id: 1,
    nick: `${faker.name.findName()}`,
    first_name: `${faker.name.firstName()}`,
    last_name: `${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: 1,
    avatar: 'no-image.png',
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
    avatar: 'no-image.png',
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
    avatar: 'no-image.png',
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
    avatar: 'no-image.png',
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
    description: faker.company.catchPhraseDescriptor(),
    cover: "https://picsum.photos/200/300/?random",
    permission: 1,
    members_limit: 25,
    is_banned: 0
  },
  {
    id: 2,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: faker.company.catchPhraseDescriptor(),
    cover: "https://picsum.photos/200/300/?random",
    permission: 1,
    members_limit: 25,
    is_banned: 0
  },
  {
    id: 3,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: faker.company.catchPhraseDescriptor(),
    cover: "https://picsum.photos/200/300/?random",
    members_limit: 25,
    is_banned: 0
  },
  {
    id: 4,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: faker.company.catchPhraseDescriptor(),
    cover: "https://picsum.photos/200/300/?random",
    permission: 1,
    members_limit: 25,
    is_banned: 0
  },
];
const events = [
  {
    id: 1,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: faker.company.catchPhraseDescriptor(),
    cover: faker.image.nature(),
    location: faker.random.locale(),
    permission: 1,
    start_date: faker.date.future(),
    members_limit: 25,
    is_banned: 0
  },
  {
    id: 2,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: faker.company.catchPhraseDescriptor(),
    cover: faker.image.nature(),
    location: faker.random.locale(),
    permission: 1,
    start_date: faker.date.future(),
    members_limit: 25,
    is_banned: 0
  },
  {
    id: 3,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: faker.company.catchPhraseDescriptor(),
    cover: faker.image.nature(),
    location: faker.random.locale(),
    permission: 1,
    start_date: faker.date.future(),
    members_limit: 25,
    is_banned: 0
  },
  {
    id: 4,
    title: faker.company.companyName(),
    creator_id: 1,
    category_id: 1,
    description: faker.company.catchPhraseDescriptor(),
    cover: faker.image.nature(),
    location: faker.random.locale(),
    permission: 1,
    start_date: faker.date.future(),
    members_limit: 25,
    is_banned: 0
  },
];



exports.seed = async knex => {
  await knex('users').insert(users);
  await knex('categories').insert(categories);
  await knex('rooms').insert(rooms);
  await knex('events').insert(events);
  await knex('tags').insert(tags);
};

exports.seedData = {
  users,
  categories,
  rooms,
  events,
  tags
};
