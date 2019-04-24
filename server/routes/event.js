const Router = require('koa-router');

const router = new Router({prefix: '/api/event'});
const { Event } = require('./../models');
const validate = require('./../services/Validator');
const faker = require('faker')

const testEvents = [
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
    {
        "id": faker.random.number(),
        "title": faker.name.title(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "room_id": faker.random.number(),
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in est ac lorem viverra cursus. Donec eget molestie nunc. Aenean in posuere purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed dapibus justo, pellentesque fringilla tortor. Proin nec tortor justo. Quisque feugiat sed felis nec dignissim.',
        "cover": faker.image.animals(),
        "location": faker.address.city(),
        "permission": 1,
        "members": faker.random.number(),
        "members_limit": faker.random.number(),
        "is_banned": 0,
        "start_date": "2019-04-12T07:29:30.000Z",
        "created_at": "2019-04-12T07:29:30.000Z",
        "updated_at": null,
        "creator": {
            "id": 1,
            "nick": faker.name.findName(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "email": faker.internet.email(),
            "avatar": faker.image.avatar(),
            "carma": null,
            "role": 2,
            "is_banned": 0,
            "birth_date": "2019-03-09T22:00:00.000Z",
            "created_at": "2019-04-04T23:22:09.000Z",
            "updated_at": "2019-04-05T08:22:09.000Z"
        },
        "category": {
            "id": faker.random.number(),
            "title":  faker.name.title()
        }
    },
];

const handler = {

  async eventList(ctx) {
  
  // const list = await Event.fetchAll({withRelated: ['creator','category']})

  ctx.body = testEvents;
  },

  async sort(ctx) {
    let result = ctx.request.query.sort;
    console.log('result', result)
    let eventsArray = [...testEvents];

    switch(result) {
      case 'rate':
        eventsArray.sort((a, b) => b.rating - a.rating);
        break;
      case 'members':
        eventsArray.sort((a, b) => b.members - a.members);
        break;
      case 'start':
        eventsArray.sort((a, b) => a.start_date - b.start_date);
        break;
    }

    ctx.body = eventsArray;
  },

  async filter(ctx) {
    const filter = ctx.request.query;
    console.log('filter', filter);
    formatDate = d => {
      let curr_date = d.getDate();
      let curr_month = d.getMonth() + 1;
      const curr_year = d.getFullYear();
      if (curr_month < 10) curr_month = "0" + curr_month;
      if (curr_date < 10) curr_date = "0" + curr_date;
      const date = curr_year + "-" + curr_month + "-" + curr_date;
      return date;
    };
    let events = [...testEvents]
    if (filter.date && filter.category && filter.location) {
      console.log('1')
      filterEvents = events.filter(e => {
        
        return this.formatDate(new Date(e.created_at)) === this.formatDate(new Date(filter.date)) 
            && e.category.title === filter.category
            && e.location === filter.location;
      });
    } else if (!filter.date && filter.category && filter.location) {
      console.log('2')
      filterEvents = events.filter(e => {
        return e.category.title === filter.category && e.location === filter.location;
      });
    } else if (filter.date && !filter.category && filter.location){
      console.log('3')
      filterEvents = events.filter(e => {
        return this.formatDate(new Date(e.created_at)) === this.formatDate(new Date(filter.date))
            && e.location === filter.location;
      });
    } else if (!filter.date && !filter.category && filter.location){
        console.log('4')
        filterEvents = events.filter(e => {
          return e.location === filter.location;
        });
      } else if (filter.date && filter.category && !filter.location){
        console.log('5')
        filterEvents = events.filter(e => {
            return this.formatDate(new Date(e.created_at)) === this.formatDate(new Date(filter.date)) 
                && e.category.title === filter.category;
        });
      } else if (!filter.date && filter.category && !filter.location){
        console.log('6')
        filterEvents = events.filter(e => {
            return e.category.title === filter.category;
        });
      } else if (filter.date && !filter.category && !filter.location){
        console.log('7')
        filterEvents = events.filter(e => {
            return this.formatDate(new Date(e.created_at)) === this.formatDate(new Date(filter.date));
        });
      } else {
      filterEvents = events;
    }
    ctx.body = filterEvents;
  },
  async createEvent(ctx){
    await validate(ctx.request.body, {
        title:'required|string|min:3',
        creator_id:'required|numeric|min:1',
        category_id:'required|numeric|min:1',
        room_id:'required|numeric|min:1',
        description:'required|string|min:6|max:300',
        location:'required|string|min:3',
        permission:'required|numeric|min:0',
        members_limit:'numeric|min:1',
    })
    const newEvent = {
        title,
        creator_id,
        category_id,
        room_id,
        description,
        location,
        permission,
        members_limit
    } = ctx.request.body;
    await new Event(newEvent).save();
    ctx.body = ''
  },
  async getEventById(ctx) {
    const { id } = ctx.params;
    const room = await Event.where({ id }).fetch({withRelated:['creator','category'],require:true})
    ctx.body = room;
  },
  async updateEventById(ctx) {
    const { id } = ctx.params;
    const event =  await Event.where({id}).fetch({require:true});
    const { title,description,cover,permission,members_limit,category_id, start_date } = ctx.request.body;
    const obj = {title,description,cover,permission,members_limit,category_id, start_date};
    await event.save( obj, { patch:true });
    ctx.body = '';
  }
  
};

// const Event = require("./../mongoDB/models/modelEvent");

// router.post("/save-event", (ctx) => {
//   const { event_id, moderators_list, tags } = ctx.request.body;
//   let newEvent = new Event();
//   if (!event_id || !moderators_list || !tags) {
//     ctx.throwSingle("INVALID INPUTS", 404)
//   }
//   (newEvent.event_id = event_id),
//     (newEvent.comments = []),
//     (newEvent.moderators_list = moderators_list),
//     (newEvent.gallery = []),
//     (newEvent.tags = tags),
//     (newEvent.members = []),
//     (newEvent.ratings = []);
//   newEvent.save(err => {
//     if (err) return ctx.throwSingle(err, 500)
//     return ctx.body = { success: true };
//   });
// });

// router.get("/", (ctx) => {
//   Event.find((err, data) => {
//     if (err) return ctx.throwSingle(err, 500)
//     ctx.body = { 
//       success: true,
//       eventData: data
//      };
//   });
// });

router.get('/', handler.eventList);
router.get('/sort', handler.sort);
router.get('/filter', handler.filter);
router.get('/:id', handler.getEventById);
router.post('/', handler.createEvent);
router.put('/:id', handler.updateEventById);
module.exports = router.routes();
