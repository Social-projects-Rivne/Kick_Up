const Router = require('koa-router');
const { authenticated } = require('./../middlewares');
const { User, Media } = require('./../models');
const koaBody = require('koa-body');
const { uploader, validate } = require('./../services');

const router = new Router({prefix:'/api/upload'});
const allowExtensions = ['image/jpeg', 'image/jpg', 'image/png' ];
const rule = {
    entityType: 'required|in:room,event',
    entity_id: 'required|numeric|min:1'
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
            console.log('path',path);
        }
        ctx.body = path;        
    },
}
const multipartBodyParser = koaBody({ multipart: true });
router.use(authenticated)
router.post('/:entityType/:entity_id', multipartBodyParser, handler.upload);

module.exports = router.routes();