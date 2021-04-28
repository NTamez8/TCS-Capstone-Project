const express = require('express');
const userController = require('../controllers/userController');
const {hasAddress,hasDoB,hasEmail,hasFirstName,hasLastName,hasPassword,hasPhoneNo} = require('../validators/userValidators') 
const routes = express.Router();

routes.post('/signUp',[hasAddress,hasDoB,hasEmail,hasFirstName,hasLastName,hasPassword,hasPhoneNo],userController.signUp);

routes.post('/signIn',userController.signIn);

routes.get("/selectItemsfromCart",userController.selectItemsfromCart)
routes.get("/deleteItemsfromCart/:item_id",userController.deleteItemsfromCart)
routes.get("/viewItemsfromCart",userController.viewItemsfromCart)
routes.get("/checkFunds",userController.checkFunds)
routes.put("/updateProfile",userController.updateProfile)
routes.put("/updatePassword",userController.updatePassword)
routes.put("/updateFunds",userController.updateFunds)
module.exports = routes;