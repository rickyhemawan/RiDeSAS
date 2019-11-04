// jshint esversion:6

const router = require('express').Router();
const { handleDifferentUser, nonAuthPartials, sasAdminPartials, userPartials, } = require('../helpers/handleAuthType');
const homeRoutes = require('./homeRoutes');
const qualificationRoutes = require('./qualificationRoutes');
const universityRoutes = require('./universityRoutes');

router.get("/", (req,res) => {
  handleDifferentUser(req,{
    nonAuthUserCallback: () => res.render("home", {partials: nonAuthPartials}),
    sasAdminCallback: () => res.render("home", {partials: sasAdminPartials}),
  });
});

router.use(homeRoutes);
router.use('/qualifications', qualificationRoutes);
router.use('/universities', universityRoutes);

module.exports = router;
