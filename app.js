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
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.set("useCreateIndex", true);

// Models
const { User, UniAdmin, Applicant, SasAdmin } = require(__dirname + '/models/user');
const Qualification = require(__dirname + '/models/qualification');
const University = require(__dirname + '/models/university');
// Global Variables
let currentUserName = "";
const nonAuthPartials = "partials";
const sasAdminPartials = "sas_admin_partials";
const userPartials = "user_partials";

// Global Function
function handleDifferentUser (req, {nonAuthUserCallback, sasAdminCallback, uniAdminCallback, applicantCallback}){
  if(req.isAuthenticated() && currentUserName !== ""){
    User.findOne({username: currentUserName}, (error, foundUser) => {
      if(!error){
        if(foundUser.kind === "SasAdmin") sasAdminCallback();
        if(foundUser.kind === "UniAdmin") uniAdminCallback();
        if(foundUser.kind === "Applicant") applicantCallback();
      }
      else{
        console.log(error);
      }
    });
  }
  else{
    nonAuthUserCallback();
  }
}

// Routes
app.get("/", (req,res) => {
  handleDifferentUser(req,{
    nonAuthUserCallback: () => res.render("home", {partials: nonAuthPartials}),
    sasAdminCallback: () => res.render("home", {partials: sasAdminPartials}),
  });
});

app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => {
  console.log(req.body);
  const sasAdmin = new SasAdmin({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });

  SasAdmin.register(sasAdmin, req.body.password, (err) => {
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
  const user = new User({
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
        User.findOne({username: currentUserName}, (error, foundUser) => {
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

app.get("/qualifications", (req,res) => {
  handleDifferentUser(req, {
    nonAuthUserCallback: () => res.redirect("/"),
    sasAdminCallback: () => {
      Qualification.find((err, foundQualifications) => {
        res.render("sasAdminQualification", {qualifications: foundQualifications});

      });
    }
  });

});

app.get("/qualifications/new-qualification", (req, res) => {
  handleDifferentUser(req,{
    nonAuthUserCallback: () => res.redirect("/"),
    sasAdminCallback: () => res.render("sasAdminNewQualification"),
  });

});

app.post("/qualifications/new-qualification", (req,res) => {
  handleDifferentUser(req, {
    nonAuthUserCallback: () => res.redirect("/"),
    sasAdminCallback: () => {
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

      res.redirect("/qualifications");
    }
  });

});

app.get("/qualifications/:id", (req, res) => {
  handleDifferentUser(req,{
    nonAuthUserCallback: () => res.redirect("/"),
    sasAdminCallback: () => {
      Qualification.findById(req.params.id, (err, foundQualification) => {
        console.log(foundQualification);
        res.render("sasAdminEditQualification", {qualification: foundQualification});
      });
    }
  });
});

app.post("/qualifications/:id", (req, res) => {
  handleDifferentUser(req, {
    nonAuthUserCallback: () => res.redirect("/"),
    sasAdminCallback: () => {
      Qualification.findByIdAndUpdate(req.params.id, req.body, (err, foundQualification) => {
        console.log(err ? err : foundQualification);
        res.redirect("/qualifications");
      });
    }
  });

});

app.delete("/qualifications/:id", (req, res) => {
  handleDifferentUser(req, {
    nonAuthUserCallback: () => res.redirect("/"),
    sasAdminCallback: () => {
      console.log('delete said: ',req.params.id);
      Qualification.findByIdAndRemove(req.params.id, (err, foundQualification) => {
        console.log(err ? err : "delete success");
        res.send(err ? err : foundQualification);
      });
    }
  });


});

app.get("/universities", (req,res) => {
  handleDifferentUser(req, {
    nonAuthUserCallback: () => res.redirect("/"),
    sasAdminCallback: () => {
      University.find((err, found) => {
        res.render("sasAdminUniversity", {universities: found});
      });
    }
  });

});

app.get("/universities/new-university", (req, res) => {
  handleDifferentUser(req, {
    nonAuthUserCallback: () => res.redirect("/"),
    sasAdminCallback: () => {
      res.render("sasAdminNewUniversity");
    }
  });

});

app.post("/universities/new-university", (req, res) => {
  handleDifferentUser(req, {
    nonAuthUserCallback: () => res.redirect("/"),
    sasAdminCallback: () => {
      console.log(req.body);
      const university = new University({
        universityName: req.body.universityName
      });
      university.save((err) => {
        if(err){
          console.log(err);
        }
        else{
          console.log("university added, now adding admin");
          const uniAdmin = new UniAdmin({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.emal,
            universityID: university._id,
          });
          uniAdmin.save((err) => console.log(err ? err : "Success adding uni admin"));
        }
      });
      res.redirect("/universities");
    }
  });

});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
