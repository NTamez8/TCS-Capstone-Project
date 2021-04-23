const ProductModel = require('../models/productModel');

let getProductById = async(req,res)=>{
    const product_id = req.params.product_id;
    await ProductModel.find({_id:product_id},(error,data)=>{
        if(!error){
            res.json(data);
        }else{
            res.send(`Error during product retrieval: ${error}`);
        };
    });
};

let getAllProducts = async(req,res)=>{
    await ProductModel.find({},(error,data)=>{
        if(!error){
            res.json(data);
        }else{
            res.send(`Error during product retrieval: ${error}`);
        };
    });
};

let addProduct = (req,res)=>{
    const product = req.params.product;
    ProductModel.insertOne(product,(error,data)=>{
        if(!error){
            if(data.nInserted>0){
                res.send(`Product added succesfully: ${data}`);
            }else{
                res.send("Product was not added.");
            };
        }else{
            res.send(`Error during product insertion: ${error}`);
        };
    });
};

let updateProductQuantityById = (req,res)=>{
    const product_id = req.body.product_id;
    const new_quantity = req.body.new_quantity;
    ProductModel.updateOne({_id:product_id},{$set:{quantity:new_quantity}},(error,data)=>{
        if(!error){
            if(data.modifiedCount>0){
                res.send(`Product quantity updated succesfully: ${data}`);
            }else{
                res.send("Product was not updated.");
            };
        }else{
            res.send(`Error during product update: ${error}`);
        };
    });
};

let deleteProductById = (req,res)=>{
    const product_id = req.params.product_id;
    ProductModel.deleteOne({_id:product_id},(error,data)=>{
        if(!error){
            if(data.deletedCount > 0){
                res.send("Product was successfully deleted.");
            }else{
                res.send("Product was not deleted.");
            }
        }else{
            res.send(`Error during product deletion: ${error}`);
        }
    });
};

module.exports = {getProductById, getAllProducts, addProduct, updateProductQuantityById, deleteProductById};
