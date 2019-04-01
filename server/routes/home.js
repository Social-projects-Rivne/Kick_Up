const express = require('express');
const router = express.Router();
const { User } = require('./../models');
const handler = {

  async hello_world(req,res) {
     res.send('hello world');

  },
  async test_post(req,res) {
      const { hello } = req.body;
      //All users
      // const users = await User.fetchAll();
      // const userNicks = users.map(user => user.get('nick'));

      // console.log('====userNicks====',userNicks)

      //One user
      // const user = await User.where({id:2}).fetch();
      // console.log('====userInfo====',user)

      //create new user 
      // const newUser = {
      //    nick: 'Test',
      //    first_name: 'test',
      //    last_name: 'test',
      //    email: 'test@gmail.com',
      //    password: 1,
      //    avatar: 'no-image.png',
      //    carma: 123,
      //    role: 2,
      //    is_banned: false,
      //    created_at: new Date(),
      //    updated_at: new Date()
      //  };
      //  const newAdd = await new User(newUser).save();


      // //destroyUser
      //await User.where({id:9}).destroy();

      
      // const user = await User.where({id:1}).fetch();
      // const updateduser =  await user.save({ 'first_name':'newUpdatedName' },{ patch:true });
      res.send('res');
    }

};

router.get('/', handler.hello_world);
router.post('/', handler.test_post);

module.exports = router;