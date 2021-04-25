const express = require('express');
const employeeController = require('../controllers/employeeController');
const adminAuth = require('../middleware/adminPassport')();
const {hasEmail,hasFirstName,hasLastName} = require('../validators/employeeValidator');
const routes = express.Router();

routes.get('/getAll',employeeController.getAll)

routes.post('/add',[adminAuth.authenticate(),hasFirstName,hasLastName,hasEmail],employeeController.addEmployee);

routes.delete('/delete/:id',adminAuth.authenticate(),employeeController.deleteEmployee);
routes.put('/editPassword',employeeController.editPassword)
module.exports = routes;