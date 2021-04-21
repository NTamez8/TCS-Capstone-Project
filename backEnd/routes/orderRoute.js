const express = require('express');
const orderController = require('../controllers/orderController');
const routes = express.Router();

router.get("/retriveOrderById/:oid",orderController.getOrderById)
router.get("/updateProductStatus",orderController.updateOrderByStatus)
module.exports = routes;