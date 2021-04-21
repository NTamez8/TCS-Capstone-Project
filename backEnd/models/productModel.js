const mongoose = require('mongoose');


let schema = mongoose.Schema;

let product = new schema({
    _id:Number,
    name:String,
    description:String,
    price:Number,
    quantity:Number
});

module.exports = mongoose.model('Product',product);