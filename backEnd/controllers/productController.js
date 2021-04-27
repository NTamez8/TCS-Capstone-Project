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

let addProduct = async (req,res)=>{
    //console.log("In Backend");
    //console.log(req.body);

    const product = req.body.product;
    console.log(req.body);
    //new ProductModel
    let new_product = new ProductModel();
    new_product.name = product.name;
    new_product.description = product.description;
    new_product.price = product.price;
    new_product.quantity = product.quantity;
 
  await  new_product.save();
  res.send(new_product);
  
};

let updateProductQuantityById = (req,res)=>{
    const product_id = req.body.product_id;
    const new_quantity = req.body.new_quantity;
    //HTTP error code 200 from this point forward...
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
    const product_id = req.body.product_id;
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
