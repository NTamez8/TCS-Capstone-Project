const employee = require('../models/employeeModel');
const validationHandler = require('../validators/validationHandler');

let getAll = async (req,res,next) =>{
    try{
        let emps = await employee.find();
        res.send(emps);
    }
    catch(err)
    {
        next(err);
    }
}

let addEmployee = async (req,res,next) =>
{
    try{
        validationHandler(req);
        let newEmp = new employee();

        

       

        newEmp.firstName = req.body.firstName;
        newEmp.lastName = req.body.lastName;
        newEmp.email_address = req.body.email_address;

        

        newEmp.e_password = '1234';
        newEmp.first_login = true;
       await newEmp.save();
        res.send({"message":"Success",newEmp});
    }
    catch(err){
        next(err);
    }
}

let deleteEmployee = async (req,res,next)=>{

    try{
        let id = req.params.id;
        let emp = await employee.findById(id);
        if(emp == null)
        {
            let error = new Error('Bad request');
            error.statusCode = 400;
            throw error;
        }
        await emp.delete();
        res.send({"message":"deleted"});
    }
    catch(err)
    {
        next(err);
    }
}


// let editPassword=(req,res)=>{
//     let email_address=req.body.email_address;
//     let e_password=req.body.e_password
//     employee.updateMany({email_address:email_address},{$set:{e_password:e_password}},(err,result)=>{
//         if(!err){
//             if(result.nModified>0){
//             res.send("Password updated succesfully"+result)
//             }
//             else{
//                 res.send("Email is not available")
//             }
//         }
//         else{
//             res.send("Error  "+err);
//         }
//     })
// }

let editPassword = async (req,res,next)=>{

    try{
        let id = req.params.id;
        let emp = await employee.findById(id);
        if(emp == null)
        {
            let error = new Error('Bad request');
            error.statusCode = 400;
            throw error;
        }
        await emp.delete();
        res.send({"message":"edited"});
    }
    catch(err)
    {
        next(err);
    }
}





module.exports = {addEmployee,deleteEmployee,getAll,editPassword}
