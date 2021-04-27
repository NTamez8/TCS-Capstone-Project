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

    it('Should sign in',(done)=>{
        let adminCredentials = {
            "a_username":"admin",
            "a_password":"AdminCapstone"
        }
        chai.request(server).post('/admin/signIn',adminCredentials).end((err,result)=>{
            result.should.have.status(200);
            console.log(result);
        })
    })


})