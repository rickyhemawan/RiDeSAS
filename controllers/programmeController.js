// jshint esversion:6
// const Programme = require('../models/programme');
const router = require('express').Router();
const { handleDifferentUser, nonAuthPartials, sasAdminPartials, userPartials, getCurrentUserName } = require('../helpers/handleAuthType');
const { User } = require("../models/user");
const University  = require("../models/university");

module.exports = {
  showProgrammes(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      uniAdminCallback: () => {
        console.log(getCurrentUserName());
        User.findOne({username: getCurrentUserName()}, (err1, found) =>{
          if(err1) console.log(err1);
          else{
            University.findById(found.universityID, (err2, universityFounded) => {
              if(err2) console.log(err2);
              res.render("uniAdminProgramme", {university: universityFounded});
            });
          }
        });
      },
    });
  },
  showNewProgrammeForm(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () =>{
        res.redirect("/");
      },
      uniAdminCallback: ()=>{
        res.render("uniAdminNewProgramme", {universityID: req.params.id});
      }
    });
  },
  addNewProgramme(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () =>{
        res.redirect("/");
      },
      uniAdminCallback: ()=>{
        console.log(req.body);
        University.findById(req.body.universityID, (err, found) => {
          if(err) console.log(err);
          else{
            found.programmes.push({
              programmeName: req.body.programmeName,
              description: req.body.description,
              closingDate: req.body.closeDate,
            });
            found.save((err) => {
              console.log(err ? err : "success");
            });
          }
        });
        res.redirect("/programmes");
      }
    });
  },
};
