//jshint esversion: 6

module.exports = class QualificationResult {
  constructor({subjectName, grade, score}) {
    this.subjectName = subjectName;
    this.grade = grade;
    this.score = score;
   }
};
