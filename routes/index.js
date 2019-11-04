// jshint esversion:6

const router = require('express').Router();

const {
  handleDifferentUser,
  nonAuthPartials,
  sasAdminPartials,
  userPartials,
  uniAdminPartials
} = require('../helpers/handleAuthType');

const homeRoutes = require('./homeRoutes');
const qualificationRoutes = require('./qualificationRoutes');
const universityRoutes = require('./universityRoutes');
const programmeRoutes = require('./programmeRoutes');
const applicationRoutes = require('./applicationRoutes');

router.get("/", (req,res) => {
  console.log(uniAdminPartials);
  console.log(nonAuthPartials);
  handleDifferentUser(req,{
    nonAuthUserCallback: () => res.render("home", {partials: nonAuthPartials}),
    sasAdminCallback: () => res.render("home", {partials: sasAdminPartials}),
    uniAdminCallback: () => res.render("home", {partials: uniAdminPartials}),
    applicantCallback: () => res.render("home", {partials: userPartials}),
  });
});

router.use(homeRoutes);
router.use('/qualifications', qualificationRoutes);
router.use('/universities', universityRoutes);
router.use('/programmes', programmeRoutes);
router.use('/applications', applicationRoutes);

module.exports = router;
