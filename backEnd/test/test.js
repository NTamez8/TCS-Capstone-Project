var assert = require('assert');
const employeeModel = require('../models/employeeModel');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
let chai = require('chai');
let http = require('chai-http');
let server = require('../index');
const { response } = require('../index');
let should = chai.should();
chai.use(http);

describe('Test',(adminDone)=>{

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
    
        it('Should have one employee',done=>{
            
            chai.request(server).get('/employee/getAll').set('Authorization','bearer ' + adminToken).end((err,result)=>{
                result.should.have.status(200);
                result.body.should.have.length(1);
                done();
            })
        })
    
        it('Should not add employee without credentials',done=>{
            let emp = {
                firstName:"Dave",
                lastName:"david",
                email_address:"email@dave.com"
            }
            chai.request(server).post('/employee/add').send(emp).end((err,result)=>{
                result.should.have.status(401);
               
                done();
            })
        })
        it('Should have an employee',done=>{
            
            chai.request(server).get('/employee/getAll').set('Authorization','bearer ' + adminToken).end((err,result)=>{
                result.should.have.status(200);
                result.body.should.have.length(1);
                done();
            })
        })
    
        it('Should not delete employee without credentials',done=>{
           
            chai.request(server).delete('/employee/delete/'+empID).end((err,result)=>{
                result.should.have.status(401);
                done();
            })
        })
        it('Should have an employee',done=>{
            
            chai.request(server).get('/employee/getAll').set('Authorization','bearer ' + adminToken).end((err,result)=>{
                result.should.have.status(200);
                result.body.should.have.length(1);
                done();
            })
        })
     
        it('Should delete employee',done=>{
           
            chai.request(server).delete('/employee/delete/'+empID).set('Authorization','bearer ' + adminToken).end((err,result)=>{
                result.should.have.status(200);
                done();
            })
        })
    
        it('Should have an employee',done=>{
            
            chai.request(server).get('/employee/getAll').set('Authorization','bearer ' + adminToken).end((err,result)=>{
                result.should.have.status(200);
                result.body.should.have.length(0);
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
            chai.request(server).post('/product/addProduct').send({product}).set('Authorization','bearer ' + adminToken).end((err,res)=>{
                res.should.have.status(200);
             prodID = res.body._id;
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
                if(err)
                {
                    console.log(err)
                    done();
                }
                
                res.should.have.status(200);
                done();
            })
        })

       
       
    
    
    }).afterAll(async ()=>{

        
      await productModel.insertMany(
            [
                {
                    name:"Watch",
                    description:"a watch",
                    price:150,
                    quantity:10
                },
                {
                    name:"Phone",
                    description:"a phone",
                    price:350,
                    quantity:50
                },
                {
                    name:"TV",
                    description:"a TV",
                    price:1500,
                    quantity:5
                },
                {
                    name:"Computer",
                    description:"a computer",
                    price:457.58,
                    quantity:100
                },
                {
                    name:"Calculator",
                    description:"a caclulator",
                    price:275,
                    quantity:33
                },
            ]
        )


    });
    
    describe('User',()=>{
        let userToken = '';
        let totalCost = 0;
        it('Should sign up',done=>{
            let user = {
                firstName:"test",
                lastName:"person",
                u_username:"test@person.com",
                u_password:"1234",
                address:'a place',
                phone_number:12345,
                date_of_birth:'2021-04-23'
            }
            chai.request(server).post('/user/signUp').send(user).end((err,result)=>{
                if(err)
                {
                    console.log(err);
                    done();
                }
                result.should.have.status(200);
                userToken = result.body.token;
                
                done();
            })
        })
        it('Should sign in',done=>{
            let singInInfo={
                email:'test@person.com',
                pass:'1234'
            }
            chai.request(server).post('/user/signIn').send(singInInfo).end((err,result)=>{
                if(err)
                {
                    console.log(err);
                    done();
                }
                result.should.have.status(200);
                result.body.token.should.equal(userToken);
                
                
                done();
            })
        })
        it('Should add to cart', (done)=>{
            productModel.find({},(err,products)=>{
               
                let product_ID = products[0]._id;
                let quantityDesired = 5;
                totalCost += products[0].price * quantityDesired
                 chai.request(server).post('/user/addItemstoCart').send({product_ID,quantityDesired}).set('Authorization','bearer ' + userToken).end((err,result)=>{
                     if(err)
                     {
                         console.log(err);
                         done();
                     }
                    
                     result.should.have.status(200);
                     
                     done();
                 })
            });
         
        })
        it('Should add to cart', (done)=>{
            productModel.find({},(err,products)=>{
                let product_ID = products[1]._id;
                let quantityDesired = 5;
                totalCost += products[1].price * quantityDesired
                 chai.request(server).post('/user/addItemstoCart').send({product_ID,quantityDesired}).set('Authorization','bearer ' + userToken).end((err,result)=>{
                     if(err)
                     {
                         console.log(err);
                         done();
                     }
                    
                     result.should.have.status(200);
                     
                     done();
                 })
            });
        })
        it('Should add to cart', (done)=>{
            productModel.find({},(err,products)=>{
                let product_ID = products[2]._id;
                let quantityDesired = 5;
                totalCost += products[2].price * quantityDesired
                 chai.request(server).post('/user/addItemstoCart').send({product_ID,quantityDesired}).set('Authorization','bearer ' + userToken).end((err,result)=>{
                     if(err)
                     {
                         console.log(err);
                         done();
                     }
                    
                     result.should.have.status(200);
                     
                     done();
                 })
            });
        })
        it('Should have three cart product in cart',done=>{
            chai.request(server).get('/user/viewItemsFromCart').set('Authorization','bearer ' + userToken).end((err,result)=>{
                if(err)
                {
                    console.log(err);
                    done();
                }
               
                result.should.have.status(200);
                result.body.should.have.length(3);
            
                done();
            })
        })
        it('Should remove from cart', (done)=>{
            productModel.find({},(err,products)=>{
                let id = products[0]._id;
                chai.request(server).delete('/user/deleteItemsfromCart/'+id).set('Authorization','bearer ' + userToken).end((err,result)=>{
                    if(err)
                    {
                        console.log(err);
                        done();
                    }
                   
                   // response.should.have.status(200);
                  
                    done();
                })
            });
           
        })
        
        it('Should have two item in cart',done=>{
            chai.request(server).get('/user/viewItemsFromCart').set('Authorization','bearer ' + userToken).end((err,result)=>{
                if(err)
                {
                    console.log(err);
                    done();
                }
               
                result.should.have.status(200);
                result.body.should.have.length(2);
            
                done();
            })
        })
   
        it('Should be unable to checkout out the cart',done=>{
            chai.request(server).get('/user/checkoutCart').set('Authorization','bearer ' + userToken).end((err,result)=>{
                if(err)
                {
                    console.log(err);
                    done();
                }
               
                result.should.have.status(200);
                result.body.msg.should.be.eq('Insufficient funds to checkout')
                
                
                done();
            })
        })
        it('Should add funds so it can buy the cart',done=>{
            
            chai.request(server).put('user/updateFunds').send({fundsRef:totalCost}).set('Authorization','bearer ' + userToken).end((err,result)=>{
                if(err)
                {
                    console.log(err);
                    done();
                }
               
                
                
                done();
            })
        })
        it('Should be able checkout out the cart',done=>{
            chai.request(server).get('/user/checkoutCart').set('Authorization','bearer ' + userToken).end((err,result)=>{
                if(err)
                {
                    console.log(err);
                    done();
                }
               
                result.should.have.status(200);
               
                
                done();
            })
        })
             
        it('Should have an order',done=>{
            chai.request(server).get('order/getUserOrder').send().set('Authorization','bearer ' + userToken).end((err,result)=>{
                if(err)
                {
                    console.log(err);
                    done();
                }
               
                result.should.have.status(200);
                
                done();
            })
        })
       
     
   
    
    
    })
}).afterAll(()=>{

    //cleans up the test databases

    
    employeeModel.deleteMany({},()=>{})
    productModel.deleteMany({},()=>{})
    userModel.deleteMany({},()=>{})



})

