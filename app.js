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

app.get("/", function(req, res){
  var someone = new SasModel.Applicant({idType: "Passport", idNumber: 123});
  console.log(someone.applicantID);
  res.render("newQualificationType");
});

app.post("/", function(req,res){
  console.log(req.body);
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
