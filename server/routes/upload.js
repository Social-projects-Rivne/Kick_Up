const Router = require('koa-router');
const { authenticated } = require('./../middlewares');
const { User } = require('./../models');
const koaBody = require('koa-body');
const { uploader, validate } = require('./../services');

const router = new Router({prefix:'/api/upload'});
const allowExtensions = ['image/jpeg', 'image/jpg', 'image/png' ];
const handler = {
    async upload(ctx){
        await validate({ ...ctx.params, ...ctx.request.files.file },{
            type: `required|in:${allowExtensions.join()}`,
            uploadType: 'required|in:avatar,gallery'
        })
        const { user_id } = ctx.state;
        const { uploadType } = ctx.params;
        const { file } = ctx.request.files;
        const filePath = await uploader.upload(file,uploadType);
        if(uploadType === 'avatar'){
            //TO DO create media model and save path to media table
            await User.where({id:user_id}).save({ avatar: filePath }, { patch: true });
        }else {
            //TO DO GALLERY
        }
        ctx.body = '';        
    },
}
const multipartBodyParser = koaBody({ multipart: true, multiples: false });
router.use(authenticated)
router.post('/:uploadType', multipartBodyParser, handler.upload);

module.exports = router.routes();