const mongoose = require('mongoose');


let schema = mongoose.Schema;


let order = new schema({

    _id:String,
    u_username:String,
    cart:String,                //stringified JSON of user's cart (Product[])
    datetime_requested:String,
    datetime_fulfilled:String,
    status:String               //can be either "in-progress" or "fulfilled"

});

module.exports = mongoose.model('Order',order);