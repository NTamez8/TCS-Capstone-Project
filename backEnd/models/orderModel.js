const mongoose = require('mongoose');


let schema = mongoose.Schema;

let cartItemSchema = new schema({

    product:{type:schema.Types.ObjectId, ref:'Product'},
    quantity:Number

  },{_id:false})

let order = new schema({
    _id:Number,
    u_username:String,
    //cart:String,                //stringified JSON of user's cart (Product[])
    cart:[cartItemSchema],
    datetime_requested:Date,
    datetime_fulfilled:Date,
    status:String,
    refund:Number
 //can be either "in-progress" or "fulfilled"

});

 module.exports = mongoose.model(" ",order,"order");
// module.exports = mongoose.model("order ",order);