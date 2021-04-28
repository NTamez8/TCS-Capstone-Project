const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let schema = mongoose.Schema;

let employee = new schema({
    firstName:String,
    lastName:String,
    email_address:String,
    e_password:String,          //must be auto-generated when employee is first added by the admin
    first_login:Boolean
});
<<<<<<< HEAD
//BORROWED FROM "userModel.js", thanks :) - Darren
=======
>>>>>>> 60e8452d30f25002896cb6ae5ece7c46b16c71f7
employee.methods.encryptPassword = async password =>{
  
    const salt = await bcrypt.genSalt(5);
  
    const hash = await bcrypt.hash(password,salt);
   
    return hash;
};

<<<<<<< HEAD
//BORROWED FROM "userModel.js", thanks :) - Darren
employee.methods.validPassword = async function(candidatePassword){
    console.log(candidatePassword);
=======
employee.methods.validPassword = async function(candidatePassword){
>>>>>>> 60e8452d30f25002896cb6ae5ece7c46b16c71f7
    const result = await bcrypt.compare(candidatePassword,this.e_password);
    return result;
};

module.exports = mongoose.model('Employee',employee);