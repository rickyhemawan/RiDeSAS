//jshint esversion: 6
process.env.NODE_ENV = 'test';


const assert = require('assert');
module.exports = {
  showHomePage(browser){
    describe('home page', () => {
      // load the home page
      before(function(done) {
        this.timeout(10000);
        browser.visit('/', done);
      });

      it('should show title', () => browser.assert.text('h1', "RiDe"));
      it('should show sub-title', () => browser.assert.text('h2', "Apply Programmes easily with Ricky Delia Student Application System"));
      it('should show list of programmes', () => browser.assert.element('.row'));
    });
  },
  showRegisterPage(browser){
    describe('register page', () => {

      before(function(done) {
        this.timeout(10000);
        browser.visit('/register', done);
      });

      it('should show register title', () => browser.assert.text('h1', "Register"));
      it('should have register form', () => browser.assert.element('form'));
    });
  },
  showLoginPage(browser){
    describe('login page', () => {
      before(function(done) {
        this.timeout(10000);
        browser.visit('/login', done);
      });

      it('should show login title', () => browser.assert.text('h1', "Login"));
      it('should have login form', () => browser.assert.element('form'));

      describe('Applicant submit login form', () => {
        before(function(done){
          this.timeout(10000);
          browser.fill('username', 'ricky')
            .then(() => browser.fill('password', '123'))
            .then(() => browser.pressButton('Login', done));
        });

        it('should see applicant home page', () => browser.assert.text('h1', 'RiDe'));
        it('should see MY QUALIFICATION and LOG OUT navigator', () => browser.assert.text('li', 'MY QUALIFICATIONLOG OUT'));
        it('should log applicant out when log out navigation pressed', () => browser.visit('/logout'));
      });

      describe('University admin submit login form', () => {
        before(function(done){
          this.timeout(10000);
          browser.visit('/login')
            .then(() => browser.fill('username', 'va'))
            .then(() => browser.fill('password', '123'))
            .then(() => browser.pressButton('Login', done));
        });

        it('should see applicant home page', () => browser.assert.text('h1', 'Home'));
        it('should see PROGRAMME and LOG OUT navigator', () => browser.assert.text('li', 'PROGRAMMELOG OUT'));
        it('should log university admin out when log out navigation pressed', () => browser.visit('/logout'));
      });

      describe('SAS Admin submit login form', () => {
        before(function(done){
          this.timeout(10000);
          browser.visit('/login')
            .then(() => browser.fill('username', 'test'))
            .then(() => browser.fill('password', '123'))
            .then(() => browser.pressButton('Login', done));
        });

        it('should see sas admin home page', () => browser.assert.text('h1', 'Home'));
        it('should see UNIVERSITY, QUALIFICATION, and LOG OUT navigator', () => browser.assert.text('li', 'UNIVERSITYQUALIFICATIONLOG OUT'));
        it('should log sas admin out when log out navigation pressed', () => browser.visit('/logout'));
      });

    });
  },
};
