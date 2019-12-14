// jshint esversion:6
const router = require('express').Router();
const { ProgrammeController } = require('../controllers');

router.get("/", ProgrammeController.showProgrammes);
router.get("/:id/add-programme", ProgrammeController.showNewProgrammeForm);
router.post("/:id/add-programme", ProgrammeController.addNewProgramme);
router.get("/:id/edit-programme/:programmeID", ProgrammeController.showEditProgrammeForm);
router.post("/:id/edit-programme/:programmeID", ProgrammeController.editProgramme);
router.get("/:id/apply-for-programme/:programmeID", ProgrammeController.showApplyForProgrammeForm);
router.post("/:id/apply-for-programme/:programmeID", ProgrammeController.applyForProgramme);
router.get("/:id/show-applicants/:programmeID", ProgrammeController.showApplicants);
router.get("/:id/show-applicants/:programmeID/applicant/:applicationID", ProgrammeController.showReviewApplicant);
router.post("/:id/show-applicants/:programmeID/applicant/:applicationID", ProgrammeController.reviewApplicant);

module.exports = router;
