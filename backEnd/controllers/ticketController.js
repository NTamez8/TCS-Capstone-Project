const ticket = require('../models/ticketModel');

let getDetailOfUser=(req,res)=>{
    // let u_username=req.params.u_username;     //passing through path param
    ticket.find({},(err,data)=>{
        if(!err){
            res.json(data);    //return array
        }
    })
}

let addTicketInfo = (req,res)=>{
    let newTicket = ticket({
        u_username= req.params.u_username,
        datetime_raised = req.params.datetime_raised
    })
    newTicket.save((err,result)=> {
        if(!err){
            res.send("Ticket raised successfully! "+result)
        }else {
            res.send("Ticket unable to raise! "+err);
        }
    })
  
}
module.exports = {getDetailOfUser, addTicketInfo}