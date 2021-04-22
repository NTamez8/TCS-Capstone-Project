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
    ProductModel.updateMany({_id:pid},{$set:{status:updatedstatus}},(err,result)=>{
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