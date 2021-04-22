let userModel = require('../models/userModel');


let selectItemsfromCart = (req,res)=>{
    let userCart = new userModel({
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

let deleteItemsfromCart = (req,res)=>{
    
    userModel.deleteOne({_id:item_id},(err,result)=> {
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

    userModel.find({},(err,result)=> {
        if(!err){
            res.json(result);
        }
    })

}




module.exports = {selectItemsfromCart, deleteItemsfromCart, viewItemsfromCart}