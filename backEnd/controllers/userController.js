
const User = require('../models/userModel');
const validationHandler = require('../validators/validationHandler');
const userConfig = require('../config/userConfig');
const jwt = require('jwt-simple');


let getAll = async (req,res,next)=>{
    try
    {
        let users = await User.find({});
        res.send(users);
    }
    catch(err)
    {
        next(err);
    }
}

let signIn = async (req,res,next)=>{
    let user;
  
    try{
        
        let u_username = req.body.email;
        let pass = req.body.pass;
         user = await User.findOne({u_username});
        
        if(!user)
        {
            const error = new Error("Wrong credentials: not a valid user");
            error.statusCode = 401;
            throw error;
        }
        if(user.failedAttempts >= 3)
        {
           
           
            const error = new Error("Exceeded max login");
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
        user.failedAttempts = 0;
        await user.save();
        const token = jwt.encode({id:user._id},userConfig.secret);
        res.send({token});
    }
    catch(err)
    {
    
        if(err.message == 'Wrong credentials')
            {
                increaseUserFailedAttempts(user);
            }
      
        next(err);
    }
}


async function increaseUserFailedAttempts(user)
{
    let numFailed = user.failedAttempts;
    if(!numFailed)
    {
        user.failedAttempts = 1;
    }
    else
    {
        user.failedAttempts = numFailed + 1;
    }
   

    await user.save();
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
        user.failedAttempts = 0;
        user.currentCart = [];
        
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
      
        res.send("Authorized");
    }
    catch(err)
    {
        next(err);
    }
}
let getMe = async(req,res,next)=>
{
    try{
      
       let me = await User.findById(req.user);
       return res.send(me);
    }
    catch(err)
    {
        next(err);
    }
}

/*
let selectItemsfromCart = async(req,res)=>{
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
    

}*/

// --------------------------------Adding changes to the Cart-----------------------------------//

let addItemstoCart = async (req, res, next) => {
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    const name = req.body.name;
    const price = req.body.price;
    const user_id = req.body.user_id;
  
    try {
      let cart = await User.findOne({user_id});
  
      if (cart) {
        //if the cart is existing for the user
        let item_idx = cart.product.findIndex(p => p.product_id == product_id);
        // if product is existing in the cart update the quantity
        if (item_idx > -1) {
          let product_item = cart.product[item_idx];
          product_item.quantity = quantity;
          cart.product[item_idx] = product_item;
        // if product is not in the cart, add the new item
        } else {
          cart.product.push({product_id, quantity, name, price });
        }
        cart = await cart.save();
        return res.send(cart);
        // if the cart doesn't exist create a new cart for the user
      } else {
        let new_Cart = await Cart.create({
          user_id,
          product: [{ product_id, quantity, name, price }]
        });
        return res.send(new_Cart);
      }
    } catch (err) {
      next(err);
      res.send("Error loading the page");
    }
  };

  let deleteItemsfromCart = async (req, res, next) => {
    let cart = await User.findOne({user_id});
    cart.updateMany({user_id : req.params.user_id}, 
        { $pull: { product : {product_id: req.params.product_id }}}, {multi: true}, (err, result)=> {
            if (!err){
                res.send("Items in cart deleted successfully" + result)
            } 
            else{
             res.send("Error generated "+err)
            }
        })
    };

  let viewItemsfromCart =(req,res)=> {

        User.find({},(err,result)=> {
            if(!err){
                res.json(result);
            }
        })
    
    }

let updatestatusToUser=async(req,res)=>{
    let u_username=req.body.u_username;
    let locked=req.body.locked;
    User.updateOne({u_username:u_username},{"$set":{locked:locked}},(err,result)=> {
        if(!err){
                if(result.nModified>0){
                    res.send("User Account is Unlocked Succesfully")
                }else {
                    res.send("Check the UserName");
                }
        }else {
            res.send("Error generated "+err);
        }
    })
}

//Retrive order staus
let orderstatusToUser=(req,res)=>{
    let orderdetails = neworder ({
        status:req.body.order_history,
    });
    
}


module.exports = {signIn,signUp, addItemstoCart, deleteItemsfromCart, isValid,viewItemsfromCart,updatestatusToUser,orderstatusToUser,getAll,getMe}

