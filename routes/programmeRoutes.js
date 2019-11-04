// jshint esversion:6
const router = require('express').Router();
const { ProgrammeController } = require('../controllers');

router.get("/", ProgrammeController.showProgrammes);
router.get("/:id/add-programme", ProgrammeController.showNewProgrammeForm);
router.post("/:id/add-programme", ProgrammeController.addNewProgramme);

module.exports = router;
