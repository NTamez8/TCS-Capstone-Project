export class User {
    constructor(
        public firstName:String,
        public lastName:String,
        public u_username:String,
        public u_password:String,
        public address:String,
        public phone_number:Number,
        public date_of_birth:String,
        public locked?:Boolean,
        public funds?:Number,
        public order_history?:String,            //stringified JSON of order array (Order[]) 
        public _id?:String
        ){}

}
