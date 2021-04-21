const mongoose = require('mongoose');


let schema = mongoose.Schema;


let order = new schema({
<<<<<<< HEAD
    _id:Number,
    status:String

=======
    _id:String,
    u_username:String,
    cart:String,                //stringified JSON of user's cart (Product[])
    datetime_requested:String,
    datetime_fulfilled:String,
    status:String               //can be either "in-progress" or "fulfilled"
>>>>>>> 0fcd2f4b5ccee4d1bc292e0e1300dc22404a309a
});

module.exports = mongoose.model('Order',order);