const ticket = require('../models/ticketModel');
const User = require('../models/userModel');
let getDetailOfUser=(req,res)=>{
    // let u_username=req.params.u_username;     //passing through path param
    ticket.find({},(err,data)=>{
        if(!err){
            res.json(data);    //return array
        }
    })
}

let addTicketInfo = async (req,res)=>{

  
    let user = await User.findOne({u_username:req.body.user});


    let newTicket = ticket({
        user_ID: user._id,
        reason:req.body.ticket,
        datetime_raised : Date.now(),
        status:'unviewed',
        datetime_resolved:null
    })
    
    newTicket.save((err,result)=> {
        if(!err){
            res.send({"message":"Ticket raised successfully! "+result})
        }else {
            res.send({"message":"Ticket unable to raise! "+err});
        }
    })
  
}
module.exports = {getDetailOfUser, addTicketInfo}
