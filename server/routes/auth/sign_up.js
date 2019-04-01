const express = require('express');
const router = express.Router();
const { User } = require('./../../models');
const JWTService = require('./../../services/JWTService')
const moment = require('moment')
const handler = {

  async sign_up(req,res) {
    const {
      nick,
      first_name,
      last_name,
      email,
      password,
      avatar,
      birth_date } = req.body;
    const usersCount = await User.where({ email }).count();
    if (usersCount) {
      throw new Error('This email is already registered. How about to log in? ', 409);
    }    
    let userInfo = null;
    let user = null;
    userInfo = {
      nick,
      first_name,
      last_name,
      email,
      password,
      avatar,
      birth_date,
      created_at: moment().format('YYYY-MM-DD h:mm:ss')
      };
      user = await new User(userInfo).save(null);
    res.status = 201;
    res.send({
      token: `Bearer ${JWTService.signUser(user)}`,
      id: user.get('id')
    });
  }
};

router.post('/api/signup', handler.sign_up);

module.exports = router;
