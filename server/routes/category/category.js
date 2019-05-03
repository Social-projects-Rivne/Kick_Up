const Router = require('koa-router');
const { Category } =require('../../models');
const validate = require('../../services/Validator');
const router = new Router({ prefix: '/api/category'});

const handler = {
    async categoryList(ctx) {
        const list = await Category.fetchAll();
        ctx.body = list;
    },
    async createCategory(ctx){
        await validate(ctx.request.body, {
            title:'required|string|min:3',
        });
        const { title } = ctx.request.body;
        const category = await Category.where({title: title.toLowerCase()}).fetch()
        if(category){
            ctx.throwSingle('This tag already exists')
        }
        await new Category({title}).save();
        ctx.body = '';
    }
};

router.get('/', handler.categoryList);
router.post('/', handler.createCategory);

module.exports = router.routes();
