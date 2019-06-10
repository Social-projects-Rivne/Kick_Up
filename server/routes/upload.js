const Router = require('koa-router');
const { authenticated } = require('./../middlewares');
const { User, Media } = require('./../models');
const koaBody = require('koa-body');
const { uploader, validate } = require('./../services');

const router = new Router({prefix:'/api/upload'});
const allowExtensions = ['image/jpeg', 'image/jpg', 'image/png' ];
const types = Object.keys(constants.rating.entity_types);
const rule = {
    entityType: `required|in:${types.join()}`,
    entity_id: 'required|numeric|min:1'
}
const coverRule = {
    entityType: `required|in:${types.join()}`,
}
const handler = {
    async upload(ctx){
        await validate({ ...ctx.params, ...ctx.request.files.file },rule)
        const { user_id } = ctx.state;
        const { entityType,entity_id } = ctx.params;
        const { file } = ctx.request.files;
        let path = null;
        if(file.length > 1){
            file.forEach(async item => {
                await validate(item,{ type: `required|in:${allowExtensions.join()}`})
                filePath = await uploader.uploadGallery(item,entityType);
                await new Media({user_id,key:filePath,type:entityType,entity_id}).save();
            });
        } else {
            await validate(file,{ type: `required|in:${allowExtensions.join()}`})
            const filePath = await uploader.uploadGallery(file,entityType);
            await new Media({user_id,key:filePath,type:entityType,entity_id}).save();
            path = filePath.slice(6);
        }
        ctx.body = path;        
    },

    async uploadCover(ctx){
        await validate({ ...ctx.params, ...ctx.request.files.file },coverRule);
        const { entityType } = ctx.params;
        const { file } = ctx.request.files;
        let path = null;
        await validate(file,{ type: `required|in:${allowExtensions.join()}`})
        const filePath = await uploader.uploadGallery(file,entityType);     
        path = filePath.slice(6);
        ctx.body = path;
    }
}
const multipartBodyParser = koaBody({ multipart: true });
router.use(authenticated)
router.post('/:entityType/add', multipartBodyParser, handler.uploadCover);
router.post('/:entityType/:entity_id/edit', multipartBodyParser, handler.uploadCover);
router.post('/:entityType/:entity_id/add-event', multipartBodyParser, handler.uploadCover);
router.post('/:entityType/:entity_id', multipartBodyParser, handler.upload);

module.exports = router.routes();