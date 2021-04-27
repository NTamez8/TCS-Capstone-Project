const express = require('express');
const ticketController = require('../controllers/ticketController');
const routes = express.Router();


routes.get("/getDetailOfUser",ticketController.getDetailOfUser)
routes.post("/addTicketInfo",ticketController.addTicketInfo)

module.exports = routes;