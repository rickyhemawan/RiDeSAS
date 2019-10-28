//jshint esversion: 6

// console.log(module);

module.exports = class User{
  constructor({username, password, name, email}) {
       this.username = username;
       this.password = password;
       this.name = name;
       this.email = email;
   }

   display() {
       console.log(this.firstName + " " + this.lastName);
   }
};
