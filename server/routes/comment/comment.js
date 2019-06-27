const Router = require('koa-router');
const validate = require('../../services/Validator');
const router = new Router({ prefix: '/api/comment' });
const MongoDbComment = require('../../mongoDB/models/modelComment');
const { User } = require('../../models');
const { authenticated } = require('./../../middlewares');
const entity_types = Object.values(constants.rating.entity_types);
const Bluebird = require('bluebird');

const handler = {
  async getComments(ctx) {
    await validate(ctx.query, {
      entity_id: 'required|numeric|min:1',
      entity_type: `required|string|in:${entity_types.join()}`
    });
    const { entity_id, entity_type } = ctx.query;
    const comments = await MongoDbComment.find({ entity_id, entity_type, is_banned: false });
    const commentsList = Bluebird.map(comments, async comment => {
      let commentObj = {};
      let user;
      if (comment.author_id) {
        user = await User.where({ id: comment.author_id }).fetch();
      }
      commentObj.avatar = user ? user.get('avatar') : 'https://www.biiainsurance.com/wp-content/uploads/2015/05/no-image.jpg';
      commentObj._id = comment._id;
      commentObj.child_comments = comment.child_comments;
      commentObj.entity_type = comment.entity_type;
      commentObj.entity_id = comment.entity_id;
      commentObj.author_id = comment.author_id;
      commentObj.text = comment.text;
      return commentObj;
    });

    ctx.body = await commentsList;
  },
  async addComment(ctx) {
    await validate({ ...ctx.request.body, ...ctx.state }, {
      entity_id: 'required|numeric|min:1',
      entity_type: `required|string|in:${entity_types.join()}`,
      user_id: 'required|numeric|min:1',
      text: 'required|string|min:3',
      is_banned: 'string|in:0,1'
    });
    const { entity_id, entity_type, text, is_banned } = ctx.request.body;
    const { user_id } = ctx.state;
    const comment = new MongoDbComment(
      {
        'entity_type': entity_type,
        'entity_id': entity_id,
        'author_id': user_id,
        'text': text,
        'is_banned': is_banned,
        'child_comments': []
      }
    );
    const newComment = await comment.save();
    ctx.body = newComment;
  },
  async addAnswer(ctx) {
    await validate({ ...ctx.request.body, ...ctx.state }, {
      _id: 'required|string|min:1',
      user_id: 'required|numeric|min:1',
      text: 'required|string|min:3'
    });
    const { _id, text } = ctx.request.body;
    const { user_id } = ctx.state;
    const comment = await MongoDbComment.findOne({ _id });
    await comment.update({ child_comments: [...comment.child_comments, { text, author_id: user_id }] });
    ctx.body = '';
  },
  async deleteComment(ctx) {
    await validate({ ...ctx.request.body, ...ctx.state }, {
      _id: 'required|string|min:1',
      user_id: 'required|numeric|min:1',
      author_id: 'required|numeric|min:1'
    });
    const { _id, author_id } = ctx.request.body;
    const { user_id } = ctx.state;
    if (user_id !== author_id) {
      ctx.throwSingle('You can not delete someone else\'s comment', 400);
    }
    try {
      const comment = await MongoDbComment.findOne({ _id, author_id });
      console.log(comment);
      await comment.delete();
      ctx.body = '';
    } catch (e) {
      ctx.throwSingle('You can not delete this comment', 400);
    }

  },
  async updateComment(ctx) {
    await validate({ ...ctx.request.body, ...ctx.state }, {
      _id: 'required|string|min:1',
      user_id: 'required|numeric|min:1',
      author_id: 'required|numeric|min:1',
      text: 'required|string|min:3'
    });
    const { _id, author_id, text } = ctx.request.body;
    const { user_id } = ctx.state;
    if (user_id !== author_id) {
      ctx.throwSingle('You can not update this comment', 400);
    }
    try {
      const comment = await MongoDbComment.findOne({ _id, author_id });
      await comment.updateOne({ text });
      ctx.body = '';
    } catch (e) {
      ctx.throwSingle('You can not update this comment', 400);
    }
  }

};

router.get('/', handler.getComments);
router.post('/add', authenticated, handler.addComment);
router.post('/add/answer', authenticated, handler.addAnswer);
router.delete('/delete', authenticated, handler.deleteComment);
router.put('/update', authenticated, handler.updateComment);

module.exports = router.routes();
