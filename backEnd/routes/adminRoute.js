const express = require('express');
const adminController = require('../controllers/adminController');
const routes = express.Router();

routes.get("/signIn",adminController.signIn);

module.exports = routes;