const express = require('express');
const productController = require('../controllers/productController');
const adminAuth = require('../middleware/adminPassport')();
const routes = express.Router();

routes.get("/getProductById/:product_id",productController.getProductById);
routes.get("/getAllProducts",productController.getAllProducts);

routes.delete("/deleteProductById/:product_id",adminAuth.authenticate(),productController.deleteProductById);

routes.post("/addProduct",productController.addProduct);
routes.post("/updateProductQuantityById",productController.updateProductQuantityById);

module.exports = routes;