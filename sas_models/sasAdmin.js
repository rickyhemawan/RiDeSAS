//jshint esversion: 6

const User = require('./user');

module.exports = class SasAdmin extends User {
  constructor({username, password, name, email}) {
       super({username, password, name, email});
   }
};
