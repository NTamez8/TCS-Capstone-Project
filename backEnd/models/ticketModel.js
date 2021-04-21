const mongoose = require('mongoose');


let schema = mongoose.Schema;

let ticket = new schema({

    u_username:String,              //user who raised the ticket
    datetime_raised:String,
    datetime_resolved:String,
    status:String                   //can be either "in-progress" or "resolved"
});

module.exports = mongoose.model('Ticket',ticket);