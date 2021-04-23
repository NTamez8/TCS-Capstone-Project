const ticket = require('../models/ticketModel');

let getDetailOfUser=(req,res)=>{
    // let u_username=req.params.u_username;     //passing through path param
    ticket.find({},(err,data)=>{
        if(!err){
            res.json(data);    //return array
        }
    })
}
module.exports = {getDetailOfUser}