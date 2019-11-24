//jshint esversion:6

const { User } = require('../models/user');

const nonAuthPartials = "partials";
const sasAdminPartials = "sas_admin_partials";
const userPartials = "user_partials";
const uniAdminPartials = "uni_admin_partials";
let currentUserName = "";

function handleDifferentUser(req, {nonAuthUserCallback  = ()=>{}, sasAdminCallback  = ()=>{}, uniAdminCallback  = ()=>{}, applicantCallback  = ()=>{}}) {
  // console.log("handle diff user says currentUserName : ", this.currentUserName);
  if(req.isAuthenticated() && this.currentUserName !== ""){
    User.findOne({username: this.currentUserName}, (error, foundUser) => {
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

function setCurrentUsername(name){
  console.log();
  this.currentUserName = name;
}
function getCurrentUserName(){
  return this.currentUserName;
}

module.exports = {
  handleDifferentUser,
  nonAuthPartials,
  sasAdminPartials,
  userPartials,
  setCurrentUsername,
  uniAdminPartials,
  getCurrentUserName,
};
