// jshint esversion:6
const router = require('express').Router();
const { QualificationController } = require('../controllers');

router.get("/", QualificationController.showQualifications);
router.get("/new-qualification", QualificationController.showQualificationForm);
router.get("/applicant-create-qualification", QualificationController.showApplicantQualificationForm);
router.post("/new-qualification", QualificationController.addQualification);
router.get("/:id", QualificationController.showSelectedQualification);
router.post("/:id", QualificationController.editSelectedQualification);
router.delete("/:id", QualificationController.deleteSelectedQualification);
router.get("/:id/add-subject", QualificationController.showSubjectForm);
router.post("/:id/add-subject", QualificationController.addSubject);
router.delete("/:id/delete-subject/:subjectId", QualificationController.deleteSubject);

module.exports = router;
