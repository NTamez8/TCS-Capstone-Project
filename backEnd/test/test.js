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
    let prodID = '';
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

    it('Should add employee 2',done=>{
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

    it('Should not add product with no credentials',done=>{
        let product = {
            name:"TV",
            description:"a TV",
            price:160,
            quantity:10
        };
        chai.request(server).post('/product/addProduct').send(product).end((err,res)=>{
            
            res.should.have.status(401);
            done();
        })
    })

    it('Should add product with credentials',done=>{
        let product = {
            name:"TV",
            description:"a TV",
            price:160,
            quantity:10
        };
        chai.request(server).post('/product/addProduct').send(product).set('Authorization','bearer ' + adminToken).end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    })
    if('Should update product with credentials',done=>{
       let updateObject = {
           product_id: prodID,
           new_quantity:5
       }
        chai.request(server).put('/product/updateProductQuantityById').send(updateObject).set('Authorization','bearer ' + adminToken).end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    })
    if('Should not update product without credentials',done=>{
        let updateObject = {
            product_id: prodID,
            new_quantity:5
        }
         chai.request(server).put('/product/updateProductQuantityById').send(updateObject)
         .end((err,res)=>{
             res.should.have.status(401);
             done();
         })
     })
     it('Should not delete product without credentials',done=>{
        let deleteObject = {
            product_id: prodID
        }
        chai.request(server).post('/product/deleteProductById').send(deleteObject).end((err,res)=>{
            res.should.have.status(401);
            done();
        })
    })
    it('Should delete product with credentials',done=>{
        let deleteObject = {
            product_id: prodID
        }
        chai.request(server).post('/product/deleteProductById').send(deleteObject).set('Authorization','bearer ' + adminToken).end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    })
   


})