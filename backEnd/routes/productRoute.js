const express = require('express');
const productController = require('../controllers/productController');
const routes = express.Router();

routes.get('/test',productController.addProduct);

module.exports = routes;