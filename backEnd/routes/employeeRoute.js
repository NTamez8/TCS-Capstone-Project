const express = require('express');
const employeeController = require('../controllers/employeeController');
const multiAuth = require('../middleware/multiPassport')()
const {hasEmail,hasFirstName,hasLastName} = require('../validators/employeeValidator');
const routes = express.Router();

routes.get('/getAll',employeeController.getAll)
routes.post('/signIn',employeeController.signIn);
routes.post('/add',[multiAuth.authenticate('adminAuth'),hasFirstName,hasLastName,hasEmail],employeeController.addEmployee);



routes.post('/signIn',employeeController.signIn);

routes.delete('/delete/:id',multiAuth.authenticate('adminAuth'),employeeController.deleteEmployee);
routes.put('/editPassword',multiAuth.authenticate('empAuth'),employeeController.editPassword);
routes.get('/isValid',multiAuth.authenticate('empAuth'),employeeController.isValid);
module.exports = routes;