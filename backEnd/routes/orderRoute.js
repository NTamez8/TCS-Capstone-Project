const express = require('express');
const orderController = require('../controllers/orderController');
const routes = express.Router();

routes.get("/retriveOrderById/:oid",orderController.getOrderById)
routes.get("/updateProductStatus",orderController.updateOrderByStatus)

routes.get('/test',orderController.insertOrderTest);
routes.get('/test2',orderController.getOrdersByProduct);
module.exports = routes;