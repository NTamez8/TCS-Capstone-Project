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
        } else {
            res.send("Error generated " + err);
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


let getOrdersByDay = async (req, res, next) => {
    try {
        let day = req.body.day;
        if(day == null)
        {
            let error = new Error('Bad request');
            error.statusCode = 400;
            throw error;
        }
        let beginDay = addDay(day,-1);
        beginDay = addDay(beginDay,1);
        let endDay = addDay(day,1);
      
        day = new Date(day);
      
        let foundOrders = await order.find({
            datetime_requested: {
                $gte: beginDay,
                $lt: endDay
            }  ,status:{$not:{$eq:'cancelled'}}
        }).populate('cart.product');
        res.send(foundOrders);
    } catch (err) {
        next(err)
    }
}

function addDay(date, day) {
    var result = new Date(date);
    result.setDate(result.getDate() + day);
    return result;
}

let getOrdersByWeek = async (req, res, next) => {
    try {
        let weekStart = req.body.dateStart;
        if(weekStart == null)
        {
            let error = new Error('Bad request');
            error.statusCode = 400;
            throw error;
        }
        let weekEnd = addDay(weekStart, 8).toDateString();
        weekEnd = new Date(weekEnd);
        weekStart = new Date(weekStart);
       
        let foundOrders = await order.find({
            datetime_requested: {
                $gte: weekStart,
                $lt: weekEnd
            }  ,status:{$not:{$eq:'cancelled'}}
        }).populate('cart.product');
        res.send(foundOrders);
    } catch (err) {
        next(err)
    }
}

let getOrdersByMonth = async (req, res, next) => {
    try {
        let monthStart = req.body.monthStart;
        if(monthStart == null)
        {
            let error = new Error('Bad request');
            error.statusCode = 400;
            throw error;
        }
        let date = new Date(monthStart);
        let month = date.getMonth();
       
        let year = '';
        if (month == 12) {
            month = 0;
            year = date.getFullYear() + 1;
        } else {
            month++;
            year = date.getFullYear();
        }
        let day = 1;
        let nextMonth = new Date(year, month + 1, day);
        
        

        let foundOrders = await order.find({
            datetime_requested: {
                $gte: date,
                $lt: nextMonth.toLocaleDateString()
            }
            ,status:{$not:{$eq:'cancelled'}}
        }).populate('cart.product');
        res.send(foundOrders);
    } catch (err) {
        next(err)
    }
}

let getOrdersByProduct = async (req, res, next) => {
    try {
        let productId = req.params.id;
        let ordersByProd = await order.find({ status:{$not:{$eq:'cancelled'}}},{
           // "cart.product": productId
           cart:{$elemMatch:{product:productId}} 
        }).populate('cart.product');


        res.send(ordersByProd);

    } catch (err) {
        next(err)
    }
}

let getOrdersByCust = async (req, res, next) => {
    try {
        let custId = req.params.id;
        let ordersByProd = await order.find({
            user_ID: custId  ,status:{$not:{$eq:'cancelled'}}
        }).populate('cart.product');
        if (!ordersByProd) {
            const error = new Error("Wrong credentials");
            error.statusCode = 401;
            throw error;
        }
        res.send(ordersByProd);
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getOrderById,
    updateOrderByStatus,
    getOrdersByDay,
    getOrdersByWeek,
    getOrdersByMonth,
    getOrdersByCust,
    getOrdersByProduct,
    getorderstatusToUser
}
