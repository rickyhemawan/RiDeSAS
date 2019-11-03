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
  gradeList: {
    type: [String],
  }
});

const Qualification = new mongoose.model('Qualification', qualificationSchema);

module.exports = Qualification;
