const express = require('express');
const router = express.Router();
const { User } = require('./../../models');
const JWTService = require('./../../services/JWTService');
const Validator = require('./../../services/Validator');
const handler = {

  async sign_in(req,res,next) {
      const { email, password } = req.body;
      const validation = new Validator(req.body, {
        email: 'required|email',
        password: 'required|min:3'
      });
      if (validation.fails()) {
        return next(validation.errors);
      }

      try {
        const user = await User.where({ email: email.toLowerCase() }).fetch();
        if(!user) throw new Error('Wrong email!');
        if (!await user.comparePassword(password)) throw new Error('Wrong password!');

        res.send({
          token: `Bearer ${JWTService.signUser(user)}`,
          userId: user.get('id')
        });
      } catch (e) {
        return next(e);
      }
  }

};

router.post('/api/signin', handler.sign_in);

module.exports = router;