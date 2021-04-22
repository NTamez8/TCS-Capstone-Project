const user = require('../models/userModel');
const userValidator = require('../validators/userValidators');
let signIn = async (req,res,next)=>{
    try{

    }
    catch(err)
    {
        next(err);
    }
}


let signUp = async (req,res,next)=>{
    try{
        userValidator(req);
        let user = new user();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.u_username = req.body.u_username;
        user.u_password = req.body.u_password;
        user.address = req.body.address;
        user.phone_number = req.body.phone_number;
        user.date_of_birth = req.body.date_of_birth;
        user.locked = false;
        user.funds = 1000;
        user.order_history = '';
        await user.save();
        res.send({user})
    }
    catch(err)
    {
        next(err);
    }
}

module.exports = {signIn,signUp}