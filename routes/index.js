// jshint esversion:6

const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const qualificationRoutes = require('./qualificationRoutes');
const universityRoutes = require('./universityRoutes');
const programmeRoutes = require('./programmeRoutes');
const applicationRoutes = require('./applicationRoutes');

router.use('/', homeRoutes);
router.use('/qualifications', qualificationRoutes);
router.use('/universities', universityRoutes);
router.use('/programmes', programmeRoutes);
router.use('/applications', applicationRoutes);

module.exports = router;
