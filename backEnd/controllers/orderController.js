const order = require('../models/orderModel');

let getOrderById=(req,res)=>{
    let oid=req.params.oid;     //passing through path param
    order.find({_id:oid},(err,data)=>{
        if(!err){
            res.json(data);    //return array
        }
    })
}


let updateOrderByStatus=(req,res)=>{
    let pid=req.body.pid;
    let updatedstatus=req.body.status
    order.updateMany({_id:pid},{$set:{status:updatedstatus}},(err,result)=>{
        if(!err){
            if(result.nModified>0){
            res.send("Order updated succesfully"+result)
            }
            else{
                res.send("Order is not Upadated")
            }
        }
        else{
            res.send("Error generated "+err);
        }
    })
}

module.exports = {getOrderById,updateOrderByStatus}