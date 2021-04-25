const express = require('express');
const userController = require('../controllers/userController');
const {hasAddress,hasDoB,hasEmail,hasFirstName,hasLastName,hasPassword,hasPhoneNo} = require('../validators/userValidators') ;
const userAuth = require('../middleware/userPassport')();
const routes = express.Router();

routes.post('/signUp',[hasAddress,hasDoB,hasEmail,hasFirstName,hasLastName,hasPassword,hasPhoneNo],userController.signUp);

routes.post('/signIn',userController.signIn);
routes.get('/isValid',userAuth.authenticate(),userController.isValid);

routes.get("/addItemstoCart",userController.addItemstoCart)
routes.get("/deleteItemsfromCart/:item_id",userController.deleteItemsfromCart)
routes.get("/viewItemsfromCart",userController.viewItemsfromCart)

routes.get("/selectItemsfromCart",userController.selectItemsfromCart)
routes.get("/deleteItemsfromCart/:item_id",userController.deleteItemsfromCart)
routes.get("/viewItemsfromCart",userController.viewItemsfromCart)
routes.put('/updatestatusToUser',userController.updatestatusToUser)

module.exports = routes;