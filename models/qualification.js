// jshint esversion: 6

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qualificationSchema = new Schema({
  qualificationName: {
    type: String,
  },
  minimumScore: {
    type: Number,
  },
  maximumScore: {
      type: Number,
  },
  resultCalcDescription : {
    type: String,
  },
  resultCalcScore : {
    type: Number,
  },
  gradeList: {
    type: [String],
  },
  needApproval : {
    type: Boolean,
    default: false,
  }
});

const subjectResultSchema = new Schema({
  subjectName : {
    type: String,
  },
  grade : {
    type: String,
  },
  score : {
    type : Number,
  }
});

const applicantQualificationSchema = new Schema({
  qualification : {
    type: qualificationSchema,
  },
  overallScore : {
    type: Number,
  },
  subjectResults : {
    type: [subjectResultSchema],
  }

});

const Qualification = new mongoose.model('Qualification', qualificationSchema);

module.exports = {
  Qualification,
  applicantQualificationSchema,
};
