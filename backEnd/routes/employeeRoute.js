const express = require('express');
const employeeController = require('../controllers/employeeController');
const routes = express.Router();

routes.post('/add',employeeController.addEmployee);

module.exports = routes;