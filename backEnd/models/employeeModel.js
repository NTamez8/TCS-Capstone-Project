const mongoose = require('mongoose');


let schema = mongoose.Schema;

let employee = new schema({
    firstName:String,
    lastName:String,
    email_address:String,
    e_password:String,          //must be auto-generated when employee is first added by the admin
    first_login:Boolean
});
employee.methods.encryptPassword = async password =>{
  
    const salt = await bcrypt.genSalt(6);
  
    const hash = await bcrypt.hash(password,salt);
   
    return hash;
};

employee.methods.validPassword = async function(candidatePassword){
    const result = await bcrypt.compare(candidatePassword,this.e_password);
    return result;
};
module.exports = mongoose.model('employee',employee);