// jshint esversion:6

const router = require('express').Router();
const { HomeController } = require('../controllers');

router.get("/", HomeController.viewHome);
router.get("/register", HomeController.viewRegisterForm);
router.post("/register", HomeController.createNewApplicant);
router.get("/new-sas-admin", HomeController.viewSasAdminRegisterForm);
router.post("/new-sas-admin", HomeController.createNewSasAdmin);
router.get("/login", HomeController.viewLoginForm);
router.post("/login", HomeController.userLogin);
router.get("/logout", HomeController.userLogout);

module.exports = router;
