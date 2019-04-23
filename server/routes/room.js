const Router = require('koa-router');
// const Room = require("./../mongoDB/models/modelRoom");
const { Room } =require('./../models');
const validate = require('./../services/Validator');
const router = new Router({ prefix: '/api/room'});
const faker = require('faker');

const testRooms = [
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "sport"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "sport"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "education"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "films"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "music"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "sport"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "education"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "music"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "sport"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "education"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "films"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "films"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "sport"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "education"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "music"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "sport"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "films"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "films"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "music"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "music"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "education"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "films"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "sport"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "education"
    }
  },
  {
    "id": faker.random.number(),
    "title": faker.company.catchPhraseDescriptor(),
    "creator_id": faker.random.number(),
    "category_id": faker.random.number(),
    "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "cover": faker.image.animals(),
    "permission": 1,
    "members_limit": faker.random.number({min:30, max:100}),
    "members": faker.random.number(30),
    "rating": faker.random.number(5),
    "is_banned": 0,
    "created_at": "2019-04-12T07:26:31.000Z",
    "updated_at": null,
    "creator": {
        "id": faker.random.number(),
        "nick": faker.name.findName(),
        "first_name": faker.name.findName(),
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
        "title": "music"
    }
  }
];

const handler = {
  async roomList(ctx) {

    const list = await Room.fetchAll({withRelated: ['creator','category']});
    const members = faker.random.number(30);
    const rating = faker.random.number(5);

    const newList  = list.map(i => i.set({members,rating}));

    // // data from DB
    ctx.body = newList;

    // data from mock
    ctx.body = testRooms;
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
        },
        {
            id: 2,
            title: "Photokina",
            description: "Photokina is an event that discovers new products and innovations in the photography field. It covers " +
                "topics such as photographic lighting, software, publishing your work and large format printing. ",
            cover: "https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2017/03/17121953/iStock-610259354.jpg",
            date: "14/06/2019",
            location: "Rivne, Ukraine"
        },
        {
            id: 3,
            title: "Aipad Photography Show",
            description: "Aipad is one of the world’s longest running exhibition dedicated to photography. It showcases museum " +
                "quality work, including contemporary, modern and 19th-century photographs as well as photo-based art, " +
                "video and new media.",
            cover: "https://images.dailyhive.com/20170713001209/photographer-e1500998450490.jpg",
            date: "12/09/2019",
            location: "Rivne, Ukraine"
        },
        {
            id: 4,
            title: "Filter Photo Festival",
            description: "The Filter Photo Festival is a 4-day event for artists to share their work with local, national and " +
                "international photography professionals. ",
            cover: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Neutral_density_filter_demonstration.jpg",
            date: "19-22/09/2019",
            location: "Kiev, Ukraine"
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
    const room = await Room.where({ id }).fetch({withRelated:['creator','category'],require:true});
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
  },

  async sort(ctx) {
    let result = ctx.request.query.sort;
    console.log('result', result);
    let roomsAray = [...testRooms];

    switch(result) {
      case 'rate':
        roomsAray.sort((a, b) => b.rating - a.rating);
        break;
      case 'members':
        roomsAray.sort((a, b) => b.members - a.members);
        break;
      case 'create':
        roomsAray.sort((a, b) => a.created_at - b.created_at);
        break;
    }

    ctx.body = roomsAray;
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
    let rooms = [...testRooms];
    if (filter.date && filter.category) {
      console.log('1');
      filterRooms = rooms.filter(e => {
        
        return this.formatDate(new Date(e.created_at)) === this.formatDate(new Date(filter.date)) && e.category.title === filter.category;
      });
    } else if (!filter.date && filter.category) {
      console.log('2');
      filterRooms = rooms.filter(e => {
        return e.category.title === filter.category;
      });
    } else if (filter.date && !filter.category){
      console.log('3');
      filterRooms = rooms.filter(e => {
        return this.formatDate(new Date(e.created_at)) === this.formatDate(new Date(filter.date));
      });
    } else {
      filterRooms = rooms;
    }
    ctx.body = filterRooms;
  },

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
router.get('/sort', handler.sort);
router.get('/filter', handler.filter);
router.get('/:id', handler.getRoomById);
router.post('/', handler.createRoom);
router.put('/:id', handler.updateRoomById);

module.exports = router.routes();
