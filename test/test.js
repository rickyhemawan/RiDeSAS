//jshint esversion: 6
const Browser = require('zombie');
const app = require('../app');
const homeRouteTest = require("./homeRouteTest");

let browser;
// initialize the browser using the same port as the test application
browser = new Browser({ site: 'http://localhost:3000' });

module.exports = browser;
homeRouteTest.showHomePage(browser);
homeRouteTest.showRegisterPage(browser);
homeRouteTest.showLoginPage(browser);
