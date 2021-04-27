const express = require('express');
const userController = require('../controllers/userController');
const {hasAddress,hasDoB,hasEmail,hasFirstName,hasLastName,hasPassword,hasPhoneNo} = require('../validators/userValidators') ;
const userAuth = require('../middleware/multiPassport')()
const routes = express.Router();

routes.get('/getAll',userController.getAll);

routes.get('/getMe',userAuth.authenticate('userAuth'),userController.getMe);

routes.post('/signUp',[hasAddress,hasDoB,hasEmail,hasFirstName,hasLastName,hasPassword,hasPhoneNo],userController.signUp);

routes.post('/signIn',userController.signIn);
routes.get('/isValid',userAuth.authenticate('userAuth'),userController.isValid);

routes.get("/addItemstoCart",userController.addItemstoCart)
routes.get("/deleteItemsfromCart/:product_id",userController.deleteItemsfromCart)
routes.get("/viewItemsfromCart",userController.viewItemsfromCart)
routes.get("/checkoutCart",userController.checkoutCart)

routes.put('/updatestatusToUser',userController.updatestatusToUser)

routes.get("/checkFunds",userController.checkFunds)
routes.put('/editPassword',userController.editPassword)
routes.put("/updateFunds",userController.updateFunds)
module.exports = routes;