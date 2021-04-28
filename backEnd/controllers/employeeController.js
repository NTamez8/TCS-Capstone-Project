const EmployeeModel = require('../models/employeeModel');
const validationHandler = require('../validators/validationHandler');
const jwt = require('jwt-simple');

let signIn = async (req,res,next)=>{
    try{
       
        const email_address = req.body.email_address;
        const e_password = req.body.e_password;
        const employee = await EMployeeModel.findOne({email_address});
        
        if(!employee){
            const error = new Error("Wrong employee credentials");
            error.statusCode = 401;
            throw error;
        };

        const e_validPassword = await employee.validPassword(e_password);
       
        if(!e_validPassword){
            const error = new Error("Wrong employee credentials");
            error.statusCode = 401;
            throw error;
        };
      
        const token = jwt.encode({id:employee._id},employeeConfig.secret);
        res.send({token});
    }catch(error){
        next(error);
    };
};

let getEmp = async (req,res,next) =>{
    try{
        let gemp = await EmployeeModel.findById(req.user);
       
        return res.send(gemp);
    }catch(error){
        next(error);
    };
};

let isValid = async (req,res,next) =>{
    try{      
        res.send("Authorized");
    }catch(error){
        next(error);
    };
};


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



module.exports = {signIn,getEmp,isValid,addEmployee,deleteEmployee,getAll}