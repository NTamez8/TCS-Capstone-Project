const express = require('express');
const orderController = require('../controllers/orderController');
const routes = express.Router();

routes.get("/retriveOrderById/:oid",orderController.getOrderById)
routes.put("/updateOrderStatus",orderController.updateOrderByStatus)
// routes.get("/storeOrderStatus",orderController.storeOrderByStatus)
routes.get("/updateProductStatus",orderController.updateOrderByStatus)


module.exports = routes;