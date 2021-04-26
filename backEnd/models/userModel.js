const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    accountN:Number,
    balance:Number,
    failedAttempts:Number,
   // order_history:String,            //stringified JSON of order array (Order[]) 
    order_history:{type:schema.Types.ObjectId, ref:'Order'}
});

user.methods.encryptPassword = async password =>{
  
    const salt = await bcrypt.genSalt(5);
  
    const hash = await bcrypt.hash(password,salt);
   
    return hash;
};

user.methods.validPassword = async function(candidatePassword){
    const result = await bcrypt.compare(candidatePassword,this.u_password);
    return result;
};

module.exports = mongoose.model('User',user);