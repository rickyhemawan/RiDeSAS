// jshint esversion: 6

const {model, Schema} = require('mongoose');

const universitySchema = new Schema({
  universityName: {
    type: String,
    required: [true, 'University name must not be empty!'],
  },
});

const University = new model('University', universitySchema);

module.exports = University;
