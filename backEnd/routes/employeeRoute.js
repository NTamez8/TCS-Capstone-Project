const express = require('express');
const employeeController = require('../controllers/employeeController');
const adminAuth = require('../middleware/multiPassport')()
const empAuth = require('../middleware/multiPassport')()
const {hasEmail,hasFirstName,hasLastName} = require('../validators/employeeValidator');
const routes = express.Router();

routes.get('/getAll',employeeController.getAll)

routes.post('/add',[adminAuth.authenticate('adminAuth'),hasFirstName,hasLastName,hasEmail],employeeController.addEmployee);

routes.delete('/delete/:id',adminAuth.authenticate('adminAuth'),employeeController.deleteEmployee);
routes.put('/editPassword/:id',empAuth.authenticate('empAuth'),employeeController.editPassword)
module.exports = routes;