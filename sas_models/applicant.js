//jshint esversion: 6

// console.log(module);

const User = require('./user');

module.exports = class Applicant extends User{
  constructor({username, password, name, email, idType, idNumber, mobileNo, dateOfBirth}) {
       super({username, password, name, email});
       this.idType = idType;
       this.idNumber = idNumber;
       this.mobileNo = mobileNo;
       this.dateOfBirth = dateOfBirth;
   }

   get applicantID(){
     return this.idType + '-' + this.idNumber;
   }

   display() {
       console.log(this.firstName + " " + this.lastName + " " + this.phoneNumber);
   }
};
