const express = require('express');
const productController = require('../controllers/productController');
const adminAuth = require('../middleware/adminPassport')();
const routes = express.Router();

routes.get("/getProductById/:product_id",productController.getProductById);
routes.get("/getAllProducts",productController.getAllProducts);

routes.post("/deleteProductById",adminAuth.authenticate(),productController.deleteProductById);

routes.post("/addProduct",adminAuth.authenticate(),productController.addProduct);
routes.post("/updateProductQuantityById",adminAuth.authenticate(),productController.updateProductQuantityById);

module.exports = routes;