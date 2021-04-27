
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
        user.accountN = 1001;
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


// --------------------------------Adding changes to the Cart-----------------------------------//
// can you test this and see if it works?
let addItemstoCart = async (req, res, next) => {
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    const name = req.body.name;
    const price = req.body.price;
    const user_id = req.body.user_id ;
  
    try {
      let userOrder = await User.findOne({user_id });
      userCart = userOrder.currentCart;
  
      if (userCart) {
        //if the cart is existing for the user
        let item_idx = userCart.product.findIndex(p => p.product_id == product_id);
        // if product is existing in the cart update the quantity
        if (item_idx > -1) {
          let product_item = userCart.product[item_idx];
          product_item.quantity = quantity;
          userCart.product[item_idx] = product_item;
        // if product is not in the cart, add the new item
        } else {
            userCart.product.push({product_id, quantity, name, price });// when adding to the cart like this is takes in a cartItem not a whole product
        }
        userCart = await userCart.save();// I think you can just do the userOrder.save() if you tested this and it works let me know
        return res.send(userCart);
        // if the cart doesn't exist create a new cart for the user
      } else {
        let new_Cart = await User.currentCart.create({
          user_id ,
          product: [{ product_id, quantity, name, price }]// the cart item model does not need an id just a reference to a product and a quantity
        });
        return res.send(new_Cart);
      }
    } catch (err) {
      next(err);
      res.send("Error loading the page");
    }
  };

  let deleteItemsfromCart = async (req, res, next) => {
    let userOrder= await User.findOne({user_id});
    userOrder.currentCart.updateMany({user_id  : req.params.user_id }, 
        { $pull: { product : {product_id: req.params.product_id }}}, {multi: true}, (err, result)=> {
            if (!err){
                res.send("Items in cart deleted successfully" + result)
            } 
            else{
             res.send("Error generated "+err)
            }
        })
    };

  let viewItemsfromCart = async(req,res)=> {
        let userOrder= await User.findOne({user_id});
        userOrder.currentCart.find({},(err,result)=> {
            if(!err){
                res.json(result);
            }
        })
    
    }

let checkoutCart = async(req,res,next)=>{
    try
    {
        let userOrder= await User.findOne({user_id});
        let funds = await User.findById(userOrder.funds)
        let cart = userOrder.currentCart;
       
        for(let i = 0; i < cart.length; i++){
                total_amount += cart[i].product.price * cart[i].quantity;
            }
        userOrder.funds = funds - total_amount;
        userOrder.save();
        res.send({"msg":"Cart checkout successful"});
    }
    catch(err)
    {
        next(err);
    }

}

let updatestatusToUser=async(req,res)=>{
    let u_username=req.body.u_username;
    let locked=req.body.locked;
    User.updateOne({u_username:u_username},{"$set":{locked:locked}},(err,result)=> {
        if(!err){
            console.log(result.funds);
            if(result.funds > cost){
                let newFunds ={};
                newFunds.fund = cost - result.funds;
                newFunds.approved = true;
                newFunds.error="";
                res.json(newFunds);
            }else{
                let errorObj = {fund:0,error: "funds are not sufficient",approved: false};
                res.json(errorObj);
            }
        }else{
            res.send("Record not found");
        }
    })
}
let updateFunds =(req,res) =>{
    let account =req.body.account;
    let amount =req.body.amount;
    user.find({u_username: id , accountN:account},(err1,result)=>{
        if(!err1){
            if(result1.balance > amount){
                let newBalance =result1.balance - amount ;
                let newFunds = result1.balance + amount;
                user.updateOne(
                    {u_username:id , accountN:account},
                    {$set:{balance: newBalance, funds: newFunds}},
                    (err2,result) =>{
                        if(!err2){
                            if(result2.nModified > 0){
                                res.send("Funds and balance is updated");
                            }else{
                                res.send("account is not available");
                            }
                        }else{
                            res.send("chcek account number");
                        }
                    }
                )
            }else{
                res.send("Amount not sufficient for transfer");
            }
        }
    })
}
let checkFunds =(req,res) =>{
    let id =   req.body.id;
    let cost = req.body.cost;
    user.find({u_username:id},(err,result)=>{
        if(!err){
            console.log(result.funds);
            if(result.funds > cost){
                let newFunds ={};
                newFunds.fund = cost - result.funds;
                newFunds.approved = true;
                newFunds.error="";
                res.json(newFunds);
            }else{
                let errorObj = {fund:0,error: "funds are not sufficient",approved: false};
                res.json(errorObj);
            }
        }else{
            res.send("Record not found");
        }
    })
}
let editPassword=(req,res)=>{
    let u_username=req.body.u_username;
    let u_password=req.body.u_password
    user.updateMany({u_username:u_username},{$set:{u_password:u_password}},(err,result)=>{
        if(!err){
            if(result.nModified>0){
            res.send("Password updated succesfully"+result)
            }
            else{
                res.send("Email is not available")
            }
        }
        else{
            res.send("Error  "+err);
        }
    })
}
//Retrive order staus
let orderstatusToUser=(req,res)=>{
    let orderdetails = neworder ({
        status:req.body.order_history,
    });
    
}

module.exports = {signIn,signUp, addItemstoCart, deleteItemsfromCart, isValid,viewItemsfromCart,updatestatusToUser,orderstatusToUser,getAll,getMe ,checkFunds,editPassword,updateFunds}



