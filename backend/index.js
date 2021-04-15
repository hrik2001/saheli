const express = require('express')
const app = express();
const port = 4000;
const authRoutes = require("./src/routes/auth")
const redis = require("redis");

const redisPort = 6379;
const client = redis.createClient(redisPort);

var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/saheli';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.header("Access-Control-Allow-Methods","*")
    next();
  });
app.use(authRoutes)

app.get('/', (req, res) => {
  res.json({"saheli" : "saheli"})
});

app.listen(port, () => {
  console.log(`saheli API should be up and running on ${port}`)
});
