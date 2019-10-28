// jshint esversion: 6

module.exports = class QualificationObtained {
  constructor({qualification, result = []}) {
    this.qualification = qualification;
    this.result = result;
   }

   get overallScore(){
     let overallScore = 0;
     // TODO add overall score logic here
     return overallScore;
   }
};
