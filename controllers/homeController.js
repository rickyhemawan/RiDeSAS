// jshint esversion:6

const { User, UniAdmin, Applicant, SasAdmin } = require('../models/user');
const passport = require('passport');
const University  = require('../models/university');
const {
  handleDifferentUser,
  nonAuthPartials,
  sasAdminPartials,
  userPartials,
  uniAdminPartials,
  setCurrentUsername,
} = require('../helpers/handleAuthType');

module.exports = {
  viewHome(req,res){
    handleDifferentUser(req,{
      nonAuthUserCallback: () => {
        University.find((err, found) => {
          if(err) console.log(err);
          else{
            console.log(found);
            res.render("programmeListHome", {partials: nonAuthPartials, universities: found});
          }
        });
      },
      sasAdminCallback: () => res.render("home", {partials: sasAdminPartials}),
      uniAdminCallback: () => res.render("home", {partials: uniAdminPartials}),
      applicantCallback: () => {
        University.find((err, found) => {
          if(err) console.log(err);
          else{
            console.log(found);
            res.render("programmeListHome", {partials: userPartials, universities: found});
          }
        });
      },
    });
  },
  viewRegisterForm(req, res){
    res.render("register");
  },
  createNewApplicant(req, res){
    console.log(req.body);
    console.log("createNewApplicant");
    const applicant = new Applicant({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      idType: req.body.idType,
      idNumber: req.body.idNumber,
      mobileNo: req.body.mobileNo,
      dateOfBirth: req.body.dateOfBirth,
    });

    Applicant.register(applicant, req.body.password, (err) => {
      if(err){
        console.log('Error while registering!', err);
      }else{
        console.log("user registered!");
        res.redirect('/login');
      }
    });
  },
  viewLoginForm(req, res){
    res.render("login");
  },
  userLogin(req, res){
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
          setCurrentUsername(req.body.username);
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
  },
  userLogout(req, res){
    req.logout();
    setCurrentUsername("");
    res.redirect("/");
  },
};
