const express = require('express');
const requestController = require('../controllers/requestController');
const routes = express.Router();

routes.post("/sendRequest",requestController.sendRequest)

module.exports = routes;