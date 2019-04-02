const express = require('express');
const router = express.Router();
const { User } = require('./../../models');
const JWTService = require('./../../services/JWTService');
const handler = {

  async sign_in(req,res) {
      const { email, password } = req.body;
      const user = await User.where({ email: email.toLowerCase() }).fetch();
      if (!user) {
        throw new Error('We tried hard but couldn\'t find the email in our database. Lets try again or sign up!');
      }
      if (!await user.comparePassword(password)) {
        throw new Error('Your password doesn\'t match. We can help to you recover it.');
      }
    res.send({
      token: `Bearer ${JWTService.signUser(user)}`,
      userId: user.get('id')
    });
  }

};

router.post('/api/signin', handler.sign_in);

module.exports = router;