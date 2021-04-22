const mongoose = require('mongoose');


let schema = mongoose.Schema;


let order = new schema({
<<<<<<< HEAD
    _id:Number,
    status:String

=======

    u_username:String,
    cart:String,                //stringified JSON of user's cart (Product[])
    datetime_requested:String,
    datetime_fulfilled:String,
    status:String               //can be either "in-progress" or "fulfilled"

>>>>>>> 33b01a2e6b5f5222504d8fcb90f406f29c1022e1
});

module.exports = mongoose.model('Order',order);