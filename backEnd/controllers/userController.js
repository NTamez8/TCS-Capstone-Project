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
        user.order_history = null;
        
        await user.save();
        const token = jwt.encode({id:user._id},userConfig.secret);
        res.send({token});
    }
    catch(err)
    {
        next(err);
    }
}

let isValid = async (req,res,next) =>{
    try{
      
        res.send({"Message":"Authorized"});
    }
    catch(err)
    {
        next(err);
    }
}





let selectItemsfromCart = (req,res)=>{
    let userCart = new User({
        _id:req.body.item_id,
        u_username: req.body.u_username    
    });
    userCart.save((err,result)=> {
        if(!err){
            res.send("Selected items stored in cart successfully "+ result)
        }else {
            res.send("Cart items didn't store "+err);
        }
    })
}

let deleteItemsfromCart = async(req,res)=>{
    
    User.deleteOne({_id:item_id},(err,result)=> {
        if(!err){
                if(result.deletedCount>0){
                    res.send("Items in cart deleted successfully")
                }else {
                    res.send("Item not present");
                }
        }else {
            res.send("Error generated "+err);
        }
    })
    

}

let viewItemsfromCart =(req,res)=> {

    User.find({},(err,result)=> {
        if(!err){
            res.json(result);
        }
    })

}

module.exports = {signIn,signUp, selectItemsfromCart, deleteItemsfromCart, viewItemsfromCart,isValid}

