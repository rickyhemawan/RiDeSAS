// jshint esversion:6
// const Applications = require('../models/applications');
const router = require('express').Router();
const {
  handleDifferentUser,
  nonAuthPartials,
  sasAdminPartials,
  userPartials,
} = require('../helpers/handleAuthType');

module.exports = {
  showApplications(req, res) {
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      uniAdminCallback: () => res.render('uniAdminApplication'),
    });
  },
};