// jshint esversion:6
const {
  Qualification
} = require('../models/qualification');
const {
  User
} = require('../models/user');
const router = require('express').Router();
const {
  handleDifferentUser,
  nonAuthPartials,
  sasAdminPartials,
  userPartials,
  getCurrentUserName
} = require('../helpers/handleAuthType');

module.exports = {
  showQualifications(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        Qualification.find((err, foundQualifications) => {
          res.render("sasAdminQualification", {
            qualifications: foundQualifications
          });

        });
      },
      applicantCallback: () => {
        User.findOne({
          username: getCurrentUserName()
        }, (err1, found) => {
          if (err1) console.log(err1);
          else {
            res.render("applicantQualification", {
              applicant: found
            });
          }
        });
      },
    });
  },
  showQualificationForm(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => res.render("sasAdminNewQualification"),
      applicantCallback: () => {
        Qualification.find((err, foundQualifications) => {
          res.render("applicantNewQualification", {
            qualifications: foundQualifications
          });
        });
      },
    });
  },
  showApplicantQualificationForm(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => res.redirect("new-qualification"),
      applicantCallback: () => res.render("applicantCreateQualification"),
    });
  },
  addQualification(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        const qualification = new Qualification({
          qualificationName: req.body.qualificationName,
          minimumScore: req.body.minScore,
          maximumScore: req.body.maxScore,
          resultCalcDescription: req.body.calcDescription,
          resultCalcScore: req.body.calcDescriptionScore ? req.body.calcDescriptionScore : 0,
          gradeList: req.body.gradeList,
          needApproval: false,
        });

        qualification.save((err) => {
          if (err) {
            console.log("Error while saving!", err);
          } else {
            console.log("Success Saving!");

          }
        });
        res.redirect("/qualifications");
      },
      applicantCallback: () => {
        let chosenQualification;
        console.log(req.body);
        if(req.body.qualificationName){
          chosenQualification = new Qualification({
            qualificationName: req.body.qualificationName,
            minimumScore: req.body.minScore,
            maximumScore: req.body.maxScore,
            resultCalcDescription: req.body.calcDescription,
            resultCalcScore: req.body.calcDescriptionScore,
            gradeList: req.body.gradeList,
            needApproval: true,
          });
          chosenQualification.save((err) => {
            if (err) {
              console.log("Error while saving!", err);
            } else {
              console.log("Success Saving!");
            }
          });
        }else{
          chosenQualification = JSON.parse(req.body.qualification);
        }
        User.findOne({
          username: getCurrentUserName()
        }, (err1, found) => {
          if (err1) console.log(err1);
          else {
            found.qualifications.push({
              qualification: chosenQualification,
            });
            found.save((err) => {
              console.log(err ? err : "success");
            });
          }
        });
        console.log(chosenQualification);
        res.redirect("/qualifications");
      }
    });
  },
  showSelectedQualification(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        Qualification.findById(req.params.id, (err, foundQualification) => {
          console.log(foundQualification);
          res.render("sasAdminEditQualification", {
            qualification: foundQualification
          });
        });
      },
      applicantCallback: () => {
        User.findOne({
          username: getCurrentUserName()
        }, (err1, found) => {
          if (err1) console.log(err1);
          else {
          res.render("applicantEditQualification", {
              applicantQualification: found.qualifications.find((k) => k.equals(req.params.id))
            });
          }
        });
      }
    });
  },
  editSelectedQualification(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        console.log("editSelectedQualification called");
        Qualification.findByIdAndUpdate(req.params.id, req.body, (err, foundQualification) => {
          console.log(err ? err : foundQualification);
          res.redirect("/qualifications");
        });
      },
      applicantCallback: () => {
        // todo
      },
    });
  },
  deleteSelectedQualification(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        console.log('delete said: ', req.params.id);
        Qualification.findByIdAndRemove(req.params.id, (err, foundQualification) => {
          console.log(err ? err : "delete success");
          res.send(err ? err : foundQualification);
        });
      },
      applicantCallback: () => {
        User.findOne({
          username: getCurrentUserName()
        }, (err1, found) => {
          if (err1) console.log(err1);
          else {
            found.qualifications.forEach((item, index, qualification) => {
              if (item._id.equals(req.params.id)) {
                qualification.splice(index, 1);
              }
            });
            found.save((err) => {
              console.log(err ? err : "success");
              res.send(err ? err : "success");
            });
          }
        });
      }
    });
  },

  showSubjectForm(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      applicantCallback: () => {
        User.findOne({
          username: getCurrentUserName()
        }, (err1, found) => {
          if (err1) console.log(err1);
          else {
            res.render("applicantNewSubject", {
              applicantQualification: found.qualifications.find((k) => k.equals(req.params.id))
            });
          }
        });
      },
    });
  },

  addSubject(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      applicantCallback: () => {
        console.log(req.body);
        User.findOne({
          username: getCurrentUserName()
        }, (err1, found) => {
          if (err1) console.log(err1);
          else {
            found.qualifications.forEach((item, index, applicantQualification) => {
              console.log("test loop---------- : ", item.subjectResults);
              if (item._id.equals(req.params.id)) {
                item.subjectResults.push({
                  subjectName: req.body.
                  subjectName,
                  grade: req.body.grade,
                  score: req.body.score,
                });
              }
            });
            found.save((err) => {
              console.log(err ? err : "success");
              res.redirect("/qualifications/" + req.params.id);
            });
          }
        });
      }
    });
  },

  deleteSubject(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      applicantCallback: () => {
        console.log(req.params);
        User.findOne({
          username: getCurrentUserName()
        }, (err1, found) => {
          if (err1) console.log(err1);
          else {
            found.qualifications.forEach((item, index, qualification) => {
              if (item._id.equals(req.params.id)) {
                item.subjectResults.forEach((item2, index2, subject) => {
                  if(item2._id.equals(req.params.subjectId)) subject.splice(index2, 1);
                });
              }
            });
            found.save((err) => {
              console.log(err ? err : "success");
              res.send(err ? err : "success");
            });
          }
        });
      }
    });
  }
};
