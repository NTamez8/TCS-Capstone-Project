const order = require('../models/orderModel');

let getOrderById=(req,res)=>{
    let _id=req.params._id;     //passing through path param
    order.find({_id:_id},(err,data)=>{
        if(!err){
            res.json(data);    //return array
        }
    })
}
 let getorderstatusToUser=(req,res)=>{
    let status=req.body.status;
    order.find({status:status},(err,data)=>{
        if(!err){
            res.json(data);    //return array
        }
    })
}
let updateOrderByStatus=(req,res)=>{
    let _id=req.body._id;
    let status=req.body.status;
    
    order.updateMany({_id:_id},{$set:{status:status}},(err,result)=>{
        if(!err){
            if(result.nModified>0){
            res.send("Order status updated succesfully"+result)

            if(status=="cancelled"){
               // res.send(user.funds);
               //total=fund+price
               //
              // let refund=req.body.refund;
               var fixfund = 1000;
               var price = 50;
               let sum = fixfund+price;
               order.updateMany({_id:_id},{$set:{refund:sum}},(err,result1)=>{
                if(result1.nModified>0){
                    res.send("refund"+result1)
                }
            });
               console.log(sum)
               


            }

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
        let beginDay = addDay(day,-1);
        beginDay = addDay(beginDay,1);
        let endDay = addDay(day,1);
        console.log(beginDay,endDay);
        day = new Date(day);
      
        let foundOrders = await order.find({
            datetime_requested: {
                $gte: beginDay,
                $lt: endDay
            }
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

        let weekEnd = addDay(weekStart, 8).toDateString();
        weekEnd = new Date(weekEnd);
        weekStart = new Date(weekStart);
       
        let foundOrders = await order.find({
            datetime_requested: {
                $gte: weekStart,
                $lt: weekEnd
            }
        }).populate('cart.product');
        res.send(foundOrders);
    } catch (err) {
        next(err)
    }
}

let getOrdersByMonth = async (req, res, next) => {
    try {
        let monthStart = req.body.monthStart;
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
        }).populate('cart.product');
        res.send(foundOrders);
    } catch (err) {
        next(err)
    }
}

let getOrdersByProduct = async (req, res, next) => {
    try {
        let productId = req.params.id;
        let ordersByProd = await order.find({},{
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
            user_ID: custId
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
