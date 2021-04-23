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
let getOrdersByDay = async (req,res,next) =>
{
    try
    {
        let day = req.body.date;
        let foundOrders = await order.find({datetime_requested:day});
        res.send(foundOrders);
    }
    catch(err)
    {
        next(err)
    }
}

function addDay(date,day)
{
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

let getOrdersByWeek = async (req,res,next) =>
{
    try
    {
        let weekStart = req.body.dateStart;      
        
        let weekEnd = addDay(weekStart,7).toLocaleDateString();
        let foundOrders = await order.find({datetime_requested:{$gte:weekStart, $lte:weekEnd}});
        res.send(foundOrders);
    }
    catch(err)
    {
        next(err)
    }
}

let getOrdersByMonth = async (req,res,next) =>
{
    try
    {
        let monthStart = req.body.monthStart;      
        let date = new Date(monthStart);
        let month = date.getMonth();
        let year = '';
        if(month == 12)
        {
            month = 1;
            year = date.getFullYear()+1;
        }
        else{
            month ++;
            year = date.getFullYear();}
        let nextMonth = new Date(year,month,day);
        let foundOrders = await order.find({datetime_requested:{$gte:monthStart, $lt:nextMonth.toLocaleDateString()}});
        res.send(foundOrders);
    }
    catch(err)
    {
        next(err)
    }
}

let getOrdersByProduct = async (req,res,next) =>
{
    try
    {
        let productId = '6081ec19a6af1e1a94f37691';
        let ordersByProd = await order.find({"cart.product":productId});
        res.send(ordersByProd);

    }
    catch(err)
    {
        next(err)
    }
}

let getOrdersByCust = async (req,res,next) =>
{
    try
    {
        let custId = req.boyd.custId;
        let ordersByProd = await order.find({u_username:custId});
        res.send(ordersByProd);
    }
    catch(err)
    {
        next(err)
    }
}


module.exports = {getOrderById,updateOrderByStatus,getOrdersByDay,getOrdersByWeek,getOrdersByMonth,getOrdersByCust,getOrdersByProduct}
