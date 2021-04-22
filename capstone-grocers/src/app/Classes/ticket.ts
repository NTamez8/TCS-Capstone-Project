export class Ticket {
    constructor(
        public u_username:String,              //user who raised the ticket
        public datetime_raised:String,
        public status:String,                   //can be either "in-progress" or "resolved"
        public datetime_resolved?:String,
        public _id?:String
        ){}

}
