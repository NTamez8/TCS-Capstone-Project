const express = require('express');
const orderController = require('../controllers/orderController');
const routes = express.Router();

routes.get("/retriveOrderById/:oid",orderController.getOrderById)
routes.get("/updateProductStatus",orderController.updateOrderByStatus)

module.exports = routes;