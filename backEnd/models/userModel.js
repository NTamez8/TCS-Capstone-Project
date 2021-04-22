const mongoose = require('mongoose');


let schema = mongoose.Schema;

let user = new schema({
  
    firstName:String,
    lastName:String,
    u_username:String,
    u_password:String,
    address:String,
    phone_number:Number,
    date_of_birth:String,
    locked:Boolean,
    funds:Number,
    order_history:String,            //stringified JSON of order array (Order[]) 
    
});

module.exports = mongoose.model('User',user);