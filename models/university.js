// jshint esversion: 6

const {model, Schema} = require('mongoose');
const { NOT_REVIEWED } = require('../constants.js');

const applicationProgramme = new Schema({
  applicationDate:{
    type: Date,
  },
  status: {
    type: String,
    default: NOT_REVIEWED,
  },
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const programmeSchema = new Schema({
  programmeName: {
    type: String,
    required: [true, 'Programme name is required'],
  },
  description: {
    type: String,
  },
  closingDate: {
    type: Date,
  },
  applications: {
    type : [applicationProgramme],
  },
});

const universitySchema = new Schema({
  universityName: {
    type: String,
    required: [true, 'University name must not be empty!'],
  },
  programmes : {
    type: [programmeSchema],
  }
});

const University = new model('University', universitySchema);

module.exports = University;
