// jshint esversion:6
const router = require('express').Router();
const { QualificationController } = require('../controllers');

router.get("/", QualificationController.showQualifications);
router.get("/new-qualification", QualificationController.showQualificationForm);
router.post("/new-qualification", QualificationController.addQualification);
router.get("/:id", QualificationController.showSelectedQualification);
router.post("/:id", QualificationController.editSelectedQualification);
router.delete("/:id", QualificationController.deleteSelectedQualification);

module.exports = router;
