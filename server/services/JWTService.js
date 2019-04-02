const jsonwebtoken = require('jsonwebtoken');


const payload = {
  data: {},
  exp: Math.floor(Date.now() / 1000) + (86400 * 60) // 2 month  
};

const JWTService = {
  signUser: userModel => {
    payload.data = {
      id: userModel.get('id')
    };
    return jsonwebtoken.sign(payload, process.env.SECRET);
  }
};

module.exports = JWTService;
