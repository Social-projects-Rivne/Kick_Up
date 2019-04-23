require("dotenv").config();
const Koa = require('koa');
const koaJson = require('koa-json');
const koaParser = require('koa-bodyparser');
const mongoose = require("mongoose");
const cors = require('@koa/cors');
const serve = require('koa-static');

const dbRoute = require("./mongoDB/constants/db");

// mongoose.connect(dbRoute, { useNewUrlParser: true }, err => {
//   if (err) throw err;
//   console.log("===> MongoDB successfully connected! <===");
// });

const app = new Koa();
app.use(cors());
app.use(koaParser({ enableTypes: ['json', 'form'] }));
app.use(koaJson({
  pretty: false
}));

app.use(serve('./static'));
require('./routes')(app);

app.listen(process.env.PORT, () => {
  console.log(`App running on port: ${process.env.PORT}`)
});

module.exports = app;
