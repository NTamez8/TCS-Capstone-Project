const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminPassport')();
const routes = express.Router();

//GET
routes.get("/isValid",adminAuth.authenticate(),adminController.isValid);
routes.get("/getMe",adminAuth.authenticate(),adminController.getMe);

//POST
routes.post("/signIn",adminController.signIn);

module.exports = routes;