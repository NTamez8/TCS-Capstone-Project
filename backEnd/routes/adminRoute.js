const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminPassport')();
const routes = express.Router();

routes.post("/signIn",adminController.signIn);
routes.get("/isValid",adminAuth.authenticate(),adminController.isValid);

module.exports = routes;