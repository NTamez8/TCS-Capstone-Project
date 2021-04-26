const mongoose = require('mongoose');


let schema = mongoose.Schema;

let employee = new schema({
    firstName:String,
    lastName:String,
    email_address:String,
    e_password:String,          //must be auto-generated when employee is first added by the admin
    first_login:Boolean
});

module.exports = mongoose.model('Employee',employee);