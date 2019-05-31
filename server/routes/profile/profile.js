const Router = require('koa-router');
const { authenticated } = require('../../middlewares');
const { User } = require('../../models');
const validate = require('../../services/Validator');
const { uploader } = require('../../services');

const router = new Router({prefix:'/api/profile'});

const handler = {

    async getSelfProfile(ctx){
        const { user_id } = ctx.state; 
        const user = await User.where({id:user_id}).fetch({withRelated:['rooms', 'events']});

        ctx.body = user;
    },
    async getUserProfileById(ctx){
        const { user_id } = ctx.state;
        const { id } = ctx.params;
        if ( +id === user_id ) {
            const user = await User.where({id:user_id}).fetch({withRelated:['rooms', 'events']});
            ctx.body = user;
        } else {
            let user = (await User.where({id}).fetch({require: true, withRelated:['publicRooms', 'publicEvents']})).toJSON();
            user.rooms = user.publicRooms;
            delete user.publicRooms;
            user.events = user.publicEvents;
            delete user.publicEvents;
            ctx.body = user;
        }
    },
    async updateUser(ctx){
        await validate(ctx.request.body, {
            nick:'string|min:3',
            first_name:'string|min:3',
            last_name:'string|min:3',
            gender:'numeric|min:1'
        });
        const { user_id } = ctx.state; 
        const { nick, first_name, last_name, gender, birth_date, avatar } = ctx.request.body;
        const updateUser = {
            nick, first_name, last_name, gender, birth_date
        }
        if(avatar){
            const avatarPath = await uploader.uploadAvatar(avatar);
            updateUser.avatar = avatarPath
        }
        const user = await User.where({id:user_id}).save(updateUser,{ patch:true })
        ctx.body = user       
    }
}
router.use(authenticated)
router.get('/', handler.getSelfProfile);
router.get('/:id', handler.getUserProfileById);
router.put('/update', handler.updateUser);

module.exports = router.routes();
