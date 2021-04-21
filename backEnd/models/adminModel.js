const mongoose = require('mongoose');


let schema = mongoose.Schema;

let admin = new schema({
    _id:Number,
    firstName:String,
    lastName:String,
    a_username:String,
    a_password:String
});

module.exports = mongoose.model('Admin',admin);