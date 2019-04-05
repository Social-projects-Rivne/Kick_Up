const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')
require("dotenv").config();

const dbRoute = require("./mongoDB/constants/db");

mongoose.connect(dbRoute, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("===> MongoDB successfully connected! <===");
});

// support parsing of application/json type post data
app.use(express.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: false }));
app.use(cors());

require("./routes")(app);

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
