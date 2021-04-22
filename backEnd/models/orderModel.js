const mongoose = require('mongoose');


let schema = mongoose.Schema;


let order = new schema({
    _id:Number,
    status:String

});

module.exports = mongoose.model('Order',order);