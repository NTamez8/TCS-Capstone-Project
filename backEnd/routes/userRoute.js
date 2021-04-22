const express = require('express');
const userController = require('../controllers/userController');
const routes = express.Router();

routes.get("/selectItemsfromCart",userController.selectItemsfromCart)
routes.get("/deleteItemsfromCart/:item_id",userController.deleteItemsfromCart)
routes.get("/viewItemsfromCart",userController.viewItemsfromCart)


module.exports = routes;