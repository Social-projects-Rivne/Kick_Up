const Router = require('koa-router');
// const Room = require("./../mongoDB/models/modelRoom");
const { Room } =require('./../models')
const faker = require('faker')

const router = new Router({ prefix: '/api/room'});


const handler = {
  async roomList(ctx) {

    const testRooms = [
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      },
      {
        "id": faker.random.number(),
        "title": faker.company.catchPhraseDescriptor(),
        "creator_id": faker.random.number(),
        "category_id": faker.random.number(),
        "description": faker.company.catchPhraseDescriptor(),
        "cover": faker.image.animals(),
        "permission": 1,
        "members_limit": faker.random.number(),
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
            "title": faker.name.title()
        }
      }
    ];

    // const list = await Room.fetchAll({withRelated: ['creator','category']})

    ctx.body = testRooms;
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


router.get('/', handler.roomList)
module.exports = router.routes();
