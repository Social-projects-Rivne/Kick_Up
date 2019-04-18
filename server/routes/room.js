const Router = require('koa-router');
// const Room = require("./../mongoDB/models/modelRoom");
const { Room } =require('./../models')
const faker = require('faker')

const router = new Router({ prefix: '/api/room'});
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

    // const list = await Room.fetchAll({withRelated: ['creator','category']})

    ctx.body = testRooms;
  },

  async sort(ctx) {
    let result = ctx.request.query.sort;
    console.log('result', result)
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
    const filter = ctx.request.body;
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
    let rooms = [...testRooms]
    if (filter.date && filter.category) {
      console.log('1')
      filterRooms = rooms.filter(e => {
        
        return this.formatDate(new Date(e.created_at)) === this.formatDate(new Date(filter.date)) && e.category.title === filter.category;
      });
    } else if (!filter.date && filter.category) {
      console.log('2')
      filterRooms = rooms.filter(e => {
        return e.category.title === filter.category;
      });
    } else if (filter.date && !filter.category){
      console.log('3')
      filterRooms = rooms.filter(e => {
        return this.formatDate(new Date(e.created_at)) === this.formatDate(new Date(filter.date));
      });
    } else {
      filterRooms = rooms;
    }
    ctx.body = filterRooms;
  },

  async filterByDate(ctx) {
    const {filter} = ctx.request.body;
    formatDate = d => {
      let curr_date = d.getDate();
      let curr_month = d.getMonth() + 1;
      const curr_year = d.getFullYear();
      if (curr_month < 10) curr_month = "0" + curr_month;
      if (curr_date < 10) curr_date = "0" + curr_date;
      const date = curr_year + "-" + curr_month + "-" + curr_date;
      return date;
    };
    const filterRoomsByDate = [...testRooms].filter(e => {
      return this.formatDate(new Date(e.created_at)) === filter;
    });
    ctx.body = filterRoomsByDate;
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
// router.get('/sort-rating', handler.sortByRating);
// router.get('/sort-members', handler.sortByMembers);
// router.get('/sort-created', handler.sortByCreated);
router.post('/filter', handler.filter);
// router.post('/filter-by-category', handler.filterByCategory);
// router.post('/filter-by-date', handler.filterByDate);

module.exports = router.routes();
