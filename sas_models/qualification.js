//jshint esversion:6

module.exports = class Qualification {
  constructor({
    qualificationID,
    qualificationName,
    minimumScore,
    maximumScore,
    resultCalcDescription,
    gradeList = []
  }) {
    this.qualificationID = qualificationID;
    this.qualificationName = qualificationName;
    this.minimumScore = minimumScore;
    this.maximumScore = maximumScore;
    this.resultCalcDescription = resultCalcDescription;
    this.gradeList = gradeList;
  }
};
