// jshint esversion: 6

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


options = {discriminatorKey: 'kind'};
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  name: {
    type: String,
    required: [true, 'Name Required'],
  },
  email: {
      type: String,
      required: [true, 'Email required.'],
  },
  options,
});

const User = new mongoose.model('User', userSchema);

const applicantSchema = new Schema({
  idType: {
    type: String,
    required: [true, 'IDType required'],
  },
  idNumber: {
    type: String,
    required: [true, 'IDNumber required'],
  },
  mobileNo: {
    type: String,
    required: [true, 'Mobile number required'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth required'],
  },
  options,
});

const Applicant = new User.discriminator('Applicant', applicantSchema);

const UniAdmin = new User.discriminator('UniAdmin', {});
const SasAdmin = new User.discriminator('SasAdmin', {});

module.exports = {
  UniAdmin,
  Applicant,
  SasAdmin,
};
