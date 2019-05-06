const Router = require('koa-router');
const { Tag } =require('../../models');
const validate = require('../../services/Validator');
const router = new Router({ prefix: '/api/tag'});

const handler = {
    async tagList(ctx) {
        const list = await Tag.fetchAll();
        ctx.body = list;
    },
    async createTag(ctx){
        await validate(ctx.request.body, {
            title:'required|string|min:3',
        });
        const { title } = ctx.request.body;
        const tag = await Tag.where({title: title.toLowerCase()}).fetch()
        if(tag){
            ctx.throwSingle('This tag already exists')
        }
        await new Tag({title}).save();
        ctx.body = '';
    }
};

router.get('/', handler.tagList);
router.post('/', handler.createTag);

module.exports = router.routes();
