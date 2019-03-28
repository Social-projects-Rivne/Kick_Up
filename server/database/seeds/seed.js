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
    created_at: new Date(),
    updated_at: new Date()
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
    created_at: new Date(),
    updated_at: new Date()
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
    created_at: new Date(),
    updated_at: new Date()
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
    created_at: new Date(),
    updated_at: new Date()
  }
];
exports.seed = async knex => {
  await knex('users').insert(users);
  await knex('categories').insert(categories);
};

exports.seedData = {
  users,
  categories
};
