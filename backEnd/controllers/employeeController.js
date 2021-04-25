const employee = require('../models/employeeModel');
const validationHandler = require('../validators/validationHandler');
const jwt =require('jwt-simple');
let signIn = async (req,res,next) =>{
    try{
        let email_address =req.body.email_address;
        let e_password =req.body.e_password;
        let Emp = await Emp.findOne({email_address});
        if(!Emp)
        {
            const error = new Error("Wrong credentials");
            error.statusCode = 401;
            throw error;
        }
        const validPassword = await Emp.validPassword(e_password);
       
        if(!validPassword)
        {
            const error = new Error("Wrong credentials");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.encode({id:Emp._id},userConfig.secret);
        res.send({token});
    }
    catch(err)
    {
        next(err);
    }
}
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
        res.send({"message":"Success"});
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





module.exports = {signIn,addEmployee,deleteEmployee,getAll}