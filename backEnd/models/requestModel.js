const mongoose = require('mongoose');


let schema = mongoose.Schema;

let request = new schema({
    _id:Number,
    e_username:String,              //employee who requested the change
    product_id:Number,              //_id in "productModel.js"
    new_quantity:Number,
    datetime_requested:String,
    datetime_resolved:String,
    status:String                   //can be either "in-progress" or "resolved"
});

module.exports = mongoose.model('Request',request);