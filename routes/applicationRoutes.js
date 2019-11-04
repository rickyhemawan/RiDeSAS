// jshint esversion:6
const router = require('express').Router();
const { ApplicationController } = require('../controllers');

router.get("/", ApplicationController.showApplications);

module.exports = router;
