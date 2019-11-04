// jshint esversion:6

const { User, UniAdmin, Applicant, SasAdmin } = require('../models/user');
const passport = require('passport');
const { setCurrentUsername } = require('../helpers/handleAuthType');

module.exports = {
  viewRegisterForm(req, res){
    res.render("register");
  },
  createNewApplicant(req, res){
    console.log(req.body);
    // TODO change this to applicant later
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
