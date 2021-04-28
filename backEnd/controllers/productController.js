const ProductModel = require('../models/productModel');

let getProductById = async(req,res,next)=>{
    try{
        const product_id = req.params.product_id;
        await ProductModel.find({_id:product_id},(error,data)=>{
            if(!error){
                res.json(data);
            }else{
                const error = new Error("Product not found.");
                error.statusCode = 404;
                throw error;
            };
        });
    }catch(tryError){
        next(tryError);
    }
};

let getAllProducts = async(req,res,next)=>{
    try{
        await ProductModel.find({},(error,data)=>{
            if(!error){
                res.json(data);
            }else{
                const error = new Error("Products not found.");
                error.statusCode = 404;
                throw error;
            };
        });
    }catch(tryError){
        next(tryError);
    }
};

let addProduct = async (req,res,next)=>{
    try{
        //console.log("In Backend");
        //console.log(req.body);

        const product = req.body.product;
        
        //new ProductModel
        let new_product = new ProductModel();
        new_product.name = product.name;
        new_product.description = product.description;
        new_product.price = product.price;
        new_product.quantity = product.quantity;
        
        await  new_product.save();
        res.send(new_product);
    }catch(tryError){
        next(tryError);
    }
  
};

let updateProductQuantityById = (req,res,next)=>{
    try{
        const product_id = req.body.product_id;
        const new_quantity = req.body.new_quantity;
        //HTTP error code 200 from this point forward...
        ProductModel.updateOne({_id:product_id},{$set:{quantity:new_quantity}},(error,data)=>{
            if(!error){
                if(data.modifiedCount>0){
                    //res.write(`Product quantity updated succesfully: ${data}`);
                }else{
                    //res.write("Product was not updated.");
                };
            }else{
                //res.write(`Error during product update: ${error}`);
            };
        });
    }catch(tryError){
        next(tryError);
    }
};

let deleteProductById = (req,res,next)=>{
    try{
        const product_id = req.body.product_id;
        ProductModel.deleteOne({_id:product_id},(error,data)=>{
            if(!error){
                if(data.deletedCount > 0){
                    //res.write("Product was successfully deleted.");
                }else{
                    //res.write("Product was not deleted.");
                }
            }else{
                //res.write(`Error during product deletion: ${error}`);
            }
        });
    }catch(tryError){
        next(tryError);
    }
};

module.exports = {getProductById, getAllProducts, addProduct, updateProductQuantityById, deleteProductById};
