//jshint esversion:6
require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 0;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

// Auth session and cookies import
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");

const routes = require(__dirname + '/routes');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Auth session and cookies use
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/rideSasDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.set("useCreateIndex", true);

app.use('/', routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
// if(!module.parent){
//   app.listen(3000, () => {
//     console.log("server started on console 3000");
//   });
// }
