// jshint esversion:6
// const Programme = require('../models/programme');
const router = require('express').Router();
const { handleDifferentUser, nonAuthPartials, sasAdminPartials, userPartials, getCurrentUserName } = require('../helpers/handleAuthType');
const { User } = require("../models/user");
const University  = require("../models/university");
const { Schema } = require("mongoose");
const { NOT_REVIEWED, SUCCESSFUL, UNSUCESSFUL } = require('../constants.js');

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
  showEditProgrammeForm(req, res){
    console.log("show edit programme form says = ",req.params);
    handleDifferentUser(req, {
      nonAuthUserCallback: () =>{
        res.redirect("/");
      },
      uniAdminCallback: ()=>{
        University.findById(req.params.id, (err, found) => {
          if(err) console.log(err);
          else{
            console.log("found : ", found);
            console.log("found programme = ", found.programmes.find((k) => k.equals(req.params.programmeID)));
            res.render("uniAdminEditProgramme", {
              university: found,
              programme: found.programmes.find((k) => k.equals(req.params.programmeID)),
            });
          }
        });
      }
    });
  },
  editProgramme(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () =>{
        res.redirect("/");
      },
      uniAdminCallback: ()=>{
        console.log(req.body);
        University.findById(req.body.universityID, (err, found) => {
          if(err) console.log(err);
          else{
            console.log("before changes ====> ", found);
            for(let i = 0; i < found.programmes.length; i++){
              if(found.programmes[i]._id.equals(req.params.programmeID)){
                found.programmes[i].programmeName = req.body.programmeName;
                found.programmes[i].closingDate = req.body.closeDate;
                found.programmes[i].description = req.body.description;
              }
            }
            console.log("after changes ====> ", found);
            found.save((err) => {
              console.log(err ? err : "success");
            });
          }
        });
        res.redirect("/programmes");
      }
    });
  },
  showApplyForProgrammeForm(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect('/login'),
      applicantCallback: () => {

        User.findOne({username: getCurrentUserName()}, (err1, found) =>{
          if(err1) console.log(err1);
          else{
            if(found.qualifications.length === 0) res.redirect("/qualifications");
            else if(found.qualifications[0].subjectResults.length === 0) res.redirect("/qualifications");
            else {
              University.findById(req.params.id, (err, found) => {
                if(err) console.log(err);
                else{
                  console.log("found : ", found);
                  console.log("found programme = ", found.programmes.find((k) => k.equals(req.params.programmeID)));
                  res.render("applicantApplyProgram", {
                    university: found,
                    programme: found.programmes.find((k) => k.equals(req.params.programmeID)),
                  });
                }
              });
            }
          }
        });
      }
    });
  },
  applyForProgramme(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect('/'),
      applicantCallback: () => {
        University.findById(req.params.id, (err, uniFound) => {
          if(err) console.log(err);
          else{
            console.log("uniFound : ", uniFound);
            console.log("uniFound programme = ", uniFound.programmes.find((k) => k.equals(req.params.programmeID)));
            User.findOne({ username: getCurrentUserName()}, (err1, userFound) => {
              if (err1) console.log(err1);
              else {
                uniFound.programmes.find((k) => k.equals(req.params.programmeID)).applications.push({
                  applicationDate: new Date(),
                  status: NOT_REVIEWED,
                  applicantId: userFound._id,
                });
                console.log("not reviewed: ", NOT_REVIEWED);
                uniFound.save((err) => {
                  console.log(err ? err : "success");
                  res.render("applicantApplicationSent", {
                    programme: uniFound.programmes.find((k) => k.equals(req.params.programmeID)),
                    university: uniFound,
                    applicant: userFound,
                  });
                });
              }
            });
          }
        });
      }
    });
  },
  showApplicants(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect('/'),
      uniAdminCallback: () => {
        University.findById(req.params.id, (err, uniFound) => {
          if(err) console.log(err);
          else{
            let applications = [];
            const applicationsList = uniFound.programmes.find((k) => k.equals(req.params.programmeID)).applications;
            if(applicationsList.length === 0){
              res.render("uniAdminApplication", {
                programme: uniFound.programmes.find((k) => k.equals(req.params.programmeID)),
                university: uniFound,
                applications: applications,
                SUCCESSFUL: SUCCESSFUL,
                UNSUCESSFUL: UNSUCESSFUL,
                NOT_REVIEWED: NOT_REVIEWED,
              });
              return;
            }
            applicationsList.forEach((e) => {
              console.log("applicantId: ", e.applicantId);
              User.findById(e.applicantId, (err, userFound) => {
                if(err) console.log(err);
                else{
                  console.log(userFound);
                  applications.push(
                    {user: userFound, otherProperty: e}
                  );
                  console.log("applications: ", applications);
                  if(applications.length === applicationsList.length){
                    res.render("uniAdminApplication", {
                      programme: uniFound.programmes.find((k) => k.equals(req.params.programmeID)),
                      university: uniFound,
                      applications: applications,
                      SUCCESSFUL: SUCCESSFUL,
                      UNSUCESSFUL: UNSUCESSFUL,
                      NOT_REVIEWED: NOT_REVIEWED,
                    });
                  }
                }
              });
            });
          }
        });
      }
    });
  },
  reviewApplicant(req, res){
    handleDifferentUser(req, {
      uniAdminCallback: () => {
        console.log("params id =====", req.params.id);
        console.log("params programmeID =====", req.params.programmeID);
        console.log("params applicationID =====", req.params.applicationID);
        University.findById(req.params.id, (err, uniFound) => {
          if(err) console.log(err);
          else{
            uniFound.programmes.forEach((programme) => {
              console.log("loop executed");
              if(programme._id.toString() === req.params.programmeID){
                console.log("programme id found");
                programme.applications.forEach((application) => {
                  console.log("loop executed 2");
                  if(application._id.toString() === req.params.applicationID){
                    console.log("applicationID found");
                    User.findById(application.applicantId, (err, userFound) => {
                      if(err) console.log(err);
                      else{
                        console.log("User is founded", userFound);
                        res.render("uniAdminReviewApplication", {
                          programme: programme,
                          application: application,
                          applicant: userFound,
                          universityID: req.params.id,
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
};
