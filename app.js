//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// -------------- SAS models import --------------
function importSAS(sasDir){
  return require(__dirname + '/sas_models/' + sasDir);
}
const SasModel = {
  User : importSAS('user'),
  SasAdmin : importSAS('sasAdmin'),
  UniAdmin : importSAS('uniAdmin'),
  Programme : importSAS('programme'),
  Applicant : importSAS('applicant'),
  University : importSAS('university'),
  Application : importSAS('application'),
  Qualification : importSAS('qualification'),
  QualificationResult : importSAS('qualificationResult'),
  QualificationObtained : importSAS('qualificationObtained'),
};
// ------------------------------------------------

app.get("/", function(req,res){
  res.render("home", {partials: "sas_admin_partials"});
});

app.get("/qualification", function(req,res){
  res.render("sasAdminQualification");
});

app.get("/university", function(req,res){
  res.render("sasAdminUniversity");

});
app.get("/qualification/new-qualification", function(req, res){
  // var someone = new SasModel.Applicant({idType: "Passport", idNumber: 123});
  // console.log(someone.applicantID);
  res.render("sasAdminNewQualification");
});

app.post("/qualification/new-qualification", function(req,res){
  console.log(req.body);
  console.log("----------");
  console.log("qualificationName: " + req.body.qualificationName);
  console.log("----------");
  console.log("gradeList: " + req.body.gradeList);
  console.log("----------");
  console.log(req.body.maxScore);
  res.redirect("/qualification");
});

app.get("/university/new-university", function(req, res){
  res.render("sasAdminNewUniversity");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
