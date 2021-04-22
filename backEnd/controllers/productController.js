const product = require('../models/productModel');

let addProduct = async (req,res,next)=>{
    let newProduct = new product();
    newProduct.name = 'watch';
    newProduct.description = 'a watch';
    newProduct.price = 140;
    newProduct.quantity = 10;
    await newProduct.save();

    let newProduct2 = new product();
    newProduct2.name = 'phone';
    newProduct2.description = 'a phone';
    newProduct2.price = 200;
    newProduct2.quantity = 50;
    await newProduct2.save();
    res.send({"message":"success"})
}

module.exports = {addProduct}