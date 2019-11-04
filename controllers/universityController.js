// jshint esversion:6
const University = require('../models/university');
const { UniAdmin } = require('../models/user');
const { handleDifferentUser, nonAuthPartials, sasAdminPartials, userPartials, uniAdminPartials } = require('../helpers/handleAuthType');

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
              name: req.body.name,
              email: req.body.emal,
              universityID: university._id,
            });
            UniAdmin.register(uniAdmin, req.body.password, (err) => {
              if(err){
                console.log('Error while registering!', err);
              }else{
                console.log("user registered!");
                res.redirect("/universities");
              }
            });
          }
        });
      }
    });
  },
  showAddUniversityAdminForm(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        University.findById(req.params.id, (err, found) => {
          if(err){
            console.log(err);
          }
          else{
            res.render("sasAdminNewAdmin", {university: found});
          }
        });
      }
    });
  },
  createNewAdmin(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        console.log("create new admin says : ", req.body);
        const uniAdmin = new UniAdmin({
          username: req.body.username,
          name: req.body.name,
          email: req.body.emal,
          universityID: req.body.universityID,
        });
        UniAdmin.register(uniAdmin, req.body.password, (err) => {
          if(err){
            console.log('Error while registering!', err);
          }else{
            console.log("user registered!");
            res.redirect("/universities");
          }
        });
      }
    });
  },
  showEditUniversityForm(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        University.findById(req.params.id, (err, found) => {
          if(err){
            console.log(err);
          }
          else{
            res.render("sasAdminEditUniversity", {university: found});
          }

        });

      }
    });
  },
  editUniversity(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        console.log("edit says: ", req.body);
        University.findByIdAndUpdate(req.params.id, {universityName: req.body.universityName} ,(err, found) => {
          if(err){
            console.log(err);
          }
          else{
            res.redirect("/universities");
          }
        });
      }
    });
  }
};
