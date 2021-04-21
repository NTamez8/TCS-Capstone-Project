const employee = require('../models/employeeModel');

let addEmployee = async (req,res,next) =>
{
    try{
        let newEmp = new employee();
        newEmp.firstName = req.body.firstName;
        newEmp.lastName = req.body.lastName;
        newEmp.email_address = req.body.email_address;
        newEmp.e_password = '1234';
        newEmp.first_login = true;
       await newEmp.save();
        res.send({"message":"Success"});
    }
    catch(err){
        next(err);
    }
}



module.exports = {addEmployee}