// jshint esversion: 6

module.exports = class Application {
  constructor({applicantID, programmeID, applicationID, applicationDate, status} = {}) {
    this.applicationID = applicantID;
    this.programmeID = programmeID;
    this.applicationID = applicationID;
    this.applicationDate = applicationDate;
    this.status = status;
   }
};
