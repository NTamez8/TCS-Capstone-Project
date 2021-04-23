const User = require('../models/userModel');
const validationHandler = require('../validators/validationHandler');
const userConfig = require('../config/userConfig');
const jwt = require('jwt-simple');
let signIn = async (req,res,next)=>{
    try{
        
        let u_username = req.body.email;
        let pass = req.body.pass;
        let user = await User.findOne({u_username});
        
        if(!user)
        {
            const error = new Error("Wrong credentials");
            error.statusCode = 401;
            throw error;
        }
        const validPassword = await user.validPassword(pass);
       
        if(!validPassword)
        {
            const error = new Error("Wrong credentials");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.encode({id:user._id},userConfig.secret);
        res.send({token});
    }
    catch(err)
    {
        next(err);
    }
}


let signUp = async (req,res,next)=>{
    try{
       
        validationHandler(req);
        let user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.u_username = req.body.u_username;
        user.u_password = await user.encryptPassword(req.body.u_password);
       
        user.address = req.body.address;
        user.phone_number = req.body.phone_number;
        user.date_of_birth = req.body.date_of_birth;
        user.locked = false;
        user.funds = 1000;
        user.order_history = '';
        
        await user.save();
        const token = jwt.encode({id:user._id},userConfig.secret);
        res.send({token});
    }
    catch(err)
    {
        next(err);
    }
}


module.exports = {signIn,signUp}