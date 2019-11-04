// jshint esversion:6

const router = require('express').Router();
const { UniversityController } = require('../controllers');

router.get("/", UniversityController.showUniversities);
router.get("/new-university", UniversityController.showAddUniversityForm);
router.post("/new-university", UniversityController.createNewUniversity);

module.exports = router;
