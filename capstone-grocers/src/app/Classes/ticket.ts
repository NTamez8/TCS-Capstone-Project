import { User } from "./user";

export class Ticket {
    constructor(
        public user_ID:User,              //user who raised the ticket
        public datetime_raised:String,
        public status:String,                   //can be either "in-progress" or "resolved"
        public reason:String,
        public datetime_resolved?:String,
        
        public _id?:String
        ){}

}
