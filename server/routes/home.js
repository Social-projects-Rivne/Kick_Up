const express = require('express');
const router = express.Router();
const handler = {

  async hello_world(req,res) {
     res.send('hello world');

  },
  async test_post(req,res) {
       const { hello } = req.body;
       res.send(hello);
    }

};

router.get('/', handler.hello_world);
router.post('/', handler.test_post);

module.exports = router;