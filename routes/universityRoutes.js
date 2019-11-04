// jshint esversion:6

const router = require('express').Router();
const { UniversityController } = require('../controllers');

router.get("/", UniversityController.showUniversities);
router.get("/new-university", UniversityController.showAddUniversityForm);
router.post("/new-university", UniversityController.createNewUniversity);
router.get("/:id/new-admin", UniversityController.showAddUniversityAdminForm);
router.post("/:id/new-admin", UniversityController.createNewAdmin);
router.get("/:id/edit-university", UniversityController.showEditUniversityForm);
router.post("/:id/edit-university", UniversityController.editUniversity);
module.exports = router;
