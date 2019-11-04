// jshint esversion:6
const router = require('express').Router();
const University = require('../models/university');
const { UniAdmin } = require('../models/user');
const { handleDifferentUser, nonAuthPartials, sasAdminPartials, userPartials, } = require('../helpers/handleAuthType');

module.exports = {
  showUniversities(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        University.find((err, found) => {
          res.render("sasAdminUniversity", {universities: found});
        });
      }
    });
  },
  showAddUniversityForm(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        res.render("sasAdminNewUniversity");
      }
    });
  },
  createNewUniversity(req, res) {
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
  },
};
