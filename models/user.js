// jshint esversion: 6

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");


options = {discriminatorKey: 'kind'};
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
  },
  name: {
    type: String,
  },
  email: {
      type: String,
  },
},options);

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
}, options);

const Applicant = User.discriminator('Applicant', applicantSchema);

const UniAdmin = User.discriminator('UniAdmin', new Schema({ universityID: {
  type: Schema.Types.ObjectId,
  ref: 'University',
}}, options));
const SasAdmin = User.discriminator('SasAdmin', new Schema({}, options));

module.exports = {
  User,
  UniAdmin,
  Applicant,
  SasAdmin,
};
