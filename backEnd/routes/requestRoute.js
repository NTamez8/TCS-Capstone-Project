const express = require('express');
const requestController = require('../controllers/requestController');
const routes = express.Router();

routes.get("/getAllRequests",requestController.getAllRequests);
routes.post("/sendRequest",requestController.sendRequest);
routes.post("/resolveRequest",requestController.resolveRequest);


module.exports = routes;