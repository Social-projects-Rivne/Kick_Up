const express = require('express');
const router = express.Router();
const handler = {

  async home(req,res) {
    res.send('home');
  }
  
};
router.get('/', handler.home);

module.exports = router;