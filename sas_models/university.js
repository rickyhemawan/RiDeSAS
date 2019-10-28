//jshint esversion: 6

module.exports = class University{
  constructor({universityID, universityName, admins = [], programmes = []}) {
    this.universityID = universityID;
    this.universityName = universityName;
    this.admins = admins;
    this.programmes = programmes;
   }
};
