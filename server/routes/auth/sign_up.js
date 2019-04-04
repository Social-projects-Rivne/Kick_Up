const express = require('express');
const router = express.Router();
const { User } = require('./../../models');
const JWTService = require('./../../services/JWTService')
const Validator = require('./../../services/Validator');
const handler = {

  async sign_up(req,res,next) {
    const { email, password } = req.body;
    const validation = await new Validator(req.body, {
      email: 'required|email',
      password: 'required|min:6'
    });
    if (validation.fails()) {
      return next(validation.errors);
    }

    try{
      const userCtn = await User.where({ email:email.toLowerCase() }).count();
      if(userCtn) throw new Error('Email has already been taken.');
      const user = await new User({email,password}).save(null);
      res.status = 201;
      res.send({
        token: `Bearer ${JWTService.signUser(user)}`,
        id: user.get('id')
      });
    } catch (e) {
      return next(e);
    }
    
  }
};

router.post('/api/signup', handler.sign_up);

module.exports = router;
