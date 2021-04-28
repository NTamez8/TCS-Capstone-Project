const express = require('express');
const productController = require('../controllers/productController');
const adminAuth = require('../middleware/multiPassport')()
const routes = express.Router();

//GET
routes.get("/getProductById/:product_id",productController.getProductById);
routes.get("/getAllProducts",productController.getAllProducts);

//DELETE
routes.post("/deleteProductById",productController.deleteProductById);

//POST
routes.post("/addProduct",productController.addProduct);
routes.post("/updateProductQuantityById",productController.updateProductQuantityById);

module.exports = routes;