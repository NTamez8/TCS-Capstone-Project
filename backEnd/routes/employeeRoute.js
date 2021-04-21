const express = require('express');
const employeeController = require('../controllers/employeeController');
const {hasEmail,hasFirstName,hasLastName} = require('../validators/employeeValidator');
const routes = express.Router();

routes.post('/add',[hasFirstName,hasLastName,hasEmail],employeeController.addEmployee);

routes.delete('/delete/:id',employeeController.deleteEmployee);

module.exports = routes;