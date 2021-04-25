const User = require('../models/userModel');
const Order = require('../models/orderModel');

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


// --------------------------------Adding changes to the Cart-----------------------------------//

let addItemstoCart = async (req, res, next) => {
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    const name = req.body.name;
    const price = req.body.price;
    const user_id = req.body.user_id;
  
    try {
      let cart = await Order.findOne({user_id});
  
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

  let deleteItemsfromCart =  (req, res, next) => {
    let cart = await Order.findOne({user_id});
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

        Order.find({},(err,result)=> {
            if(!err){
                res.json(result);
            }
        })
    
    }
module.exports = {signIn,signUp, addItemstoCart, deleteItemsfromCart, viewItemsfromCart}

