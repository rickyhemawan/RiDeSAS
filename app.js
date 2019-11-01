//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

// Auth session and cookies import
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Auth session and cookies use
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/rideSasDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set("useCreateIndex", true);

app.get("/", (req,res) => {
  res.render("home", {partials: "sas_admin_partials"});
});

app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => {
  console.log(req.body);
  res.redirect("/register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("login");
});

app.get("/qualification", (req,res) => {
  res.render("sasAdminQualification");
});

app.get("/university", (req,res) => {
  res.render("sasAdminUniversity");

});
app.get("/qualification/new-qualification", (req, res) => {
  res.render("sasAdminNewQualification");
});

app.post("/qualification/new-qualification", (req,res) => {
  console.log(req.body);
  console.log("----------");
  console.log("qualificationName: " + req.body.qualificationName);
  console.log("----------");
  console.log("gradeList: " + req.body.gradeList);
  console.log("----------");
  console.log(req.body.maxScore);
  res.redirect("/qualification");
});

app.get("/university/new-university", (req, res) => {
  res.render("sasAdminNewUniversity");
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
