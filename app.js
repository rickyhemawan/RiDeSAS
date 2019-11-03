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
  useUnifiedTopology: true
});

mongoose.set("useCreateIndex", true);

// Models
const UserModel = require(__dirname + '/models/user');
const Qualification = require(__dirname + '/models/qualification');

// Global Variables
let currentUserName = "";
const nonAuthPartials = "partials";
const sasAdminPartials = "sas_admin_partials";
const userPartials = "user_partials";

// Routes
app.get("/", (req,res) => {
  if(req.isAuthenticated() && currentUserName !== ""){
    UserModel.User.findOne({username: currentUserName}, (error, foundUser) => {
      console.log(error ? error : foundUser);
      if(!error){
        if(foundUser.kind === "SasAdmin"){
          res.render("home", {partials: sasAdminPartials});
          return;
        }

        if(foundUser.kind === "UniAdmin"){
          // TODO: create uniAdmin Front End
          console.log("uni admin");
          return;
        }

        if(foundUser.kind === "Applicant"){
          // TODO: create applicant Front End
          console.log("uni admin");
          return;
        }
      }
    });
  }
  else{
    res.render("home", {partials: nonAuthPartials});
  }



});

app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => {
  console.log(req.body);
  const sasAdmin = new UserModel.SasAdmin({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });

  UserModel.SasAdmin.register(sasAdmin, req.body.password, (err) => {
    if(err){
      console.log('Error while registering!', err);
    }else{
      console.log("user registered!");
      res.redirect('/register');
    }
  });

});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const user = new UserModel.User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if(err) console.log(err);
    else{
      passport.authenticate("local")(req, res, () => {
        console.log('user is authenticated');
        console.log('req body = ',req.body);
        currentUserName = req.body.username;
        UserModel.User.findOne({username: currentUserName}, (error, foundUser) => {
          if(error){
            console.log(error);
          }
          else{
            console.log(foundUser);
            res.redirect("/");
          }
        });
      });
    }
  });

});

app.get("/logout", function(req, res){
  req.logout();
  currentUserName = "";
  res.redirect("/");
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
  const qualification = new Qualification({
    qualificationName: req.body.qualificationName,
    minimumScore: req.body.minScore,
    maximumScore: req.body.maxScore,
    resultCalcDescription: req.body.calcDescription,
    gradeList: req.body.gradeList,
  });

  qualification.save((err) => {
    if(err){
      console.log("Error while saving!", err);
    }
    else{
      console.log("Success Saving!");

    }
  });

  res.redirect("/qualification");
});

app.get("/university/new-university", (req, res) => {
  res.render("sasAdminNewUniversity");
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
