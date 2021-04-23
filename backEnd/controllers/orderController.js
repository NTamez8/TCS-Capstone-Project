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
    let _id=req.body._id;
    let status=req.body.status
    order.updateMany({_id:_id},{$set:{status:status}},(err,result)=>{
        if(!err){
            if(result.nModified>0){
            res.send("Order status updated succesfully"+result)

            if(status=="cancelled"){
               // res.send(user.funds);
               var a = 1000;
               var b = 50;
               var sum = a+b;
               console.log(sum)
            }

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

// let storeOrderByStatus=(req,res)=>{
//     let orderdetails = new order({
//         _id:req.body.oid,
//         status:req.body.status,
        
//     });
//     orderdetails.save((err,result)=>{
//         if(!err){
//             res.send("order status upadted  successfully"+result)
//             //res.json("msg":"Record Stored successfully")
//         }else{
//             res.send("Order Didn't upadte"+err)
//         }

    
//     })

// }

module.exports = {getOrderById,updateOrderByStatus}