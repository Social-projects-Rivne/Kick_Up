const express = require('express');
const app = express();

const router = express.Router();


// support parsing of application/json type post data
app.use(express.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});