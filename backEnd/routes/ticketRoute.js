const express = require('express');
const ticketController = require('../controllers/ticketController');
const routes = express.Router();


routes.get("/getDetailOfUser",ticketController.getDetailOfUser)
module.exports = routes;