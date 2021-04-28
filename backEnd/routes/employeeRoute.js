const express = require('express');
const employeeController = require('../controllers/employeeController');
const multiPassport = require('../middleware/multiPassport')()
const {hasEmail,hasFirstName,hasLastName} = require('../validators/employeeValidator');
const routes = express.Router();

routes.get('/getAll',employeeController.getAll)

routes.post('/add',[multiPassport.authenticate('adminAuth'),hasFirstName,hasLastName,hasEmail],employeeController.addEmployee);

routes.post('/signIn',employeeController.signIn);

routes.delete('/delete/:id',multiPassport.authenticate('adminAuth'),employeeController.deleteEmployee);
routes.put('/editPassword',multiPassport.authenticate('empAuth'),employeeController.editPassword);
routes.get('/isValid',multiPassport.authenticate('empAuth'),employeeController.isValid);
module.exports = routes;