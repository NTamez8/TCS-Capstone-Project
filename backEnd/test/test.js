var assert = require('assert');
const adminController = require('../controllers/adminController');
const employeeController = require('../controllers/employeeController');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');
const requestController = require('../controllers/requestController');
const userController = require('../controllers/userController');
let chai = require('chai');
let http = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(http);

describe('Admin',()=>{

    let adminToken = '';
    let empID = '';
    it('Should sign in',(done)=>{
        let adminCredentials = {
            "a_username":"admin",
            "a_password":"AdminCapstone"
        }
        chai.request(server).post('/admin/signIn').send(adminCredentials).end((err,result)=>{
          
            result.should.have.status(200);
            adminToken = result.body.token;
            console.log();
            done();
        })
    })

    it('Should validate',done=>{
        chai.request(server).get('/admin/getMe').set('Authorization','bearer ' + adminToken).end((err,result)=>{

            result.should.have.status(200);
            

            done();
        })
    })

    it('Should add employee',done=>{
        let emp = {
            firstName:"Dave",
            lastName:"david",
            email_address:"email@dave.com"
        }
        chai.request(server).post('/employee/add').send(emp).set('Authorization','bearer ' + adminToken).end((err,result)=>{
            result.should.have.status(200);
            empID = result.body.newEmp._id;
            done();
        })
    })

 
    it('Should delete employee',done=>{
       
        chai.request(server).delete('/employee/delete/'+empID).set('Authorization','bearer ' + adminToken).end((err,result)=>{
            result.should.have.status(200);
            done();
        })
    })
   


})