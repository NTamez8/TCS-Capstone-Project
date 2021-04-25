export class Order {
    constructor(
        public u_username:String,
        public cart:String,                //stringified JSON of user's cart (Product[])
        public datetime_requested:String,
        public datetime_fulfilled:String,
        public status:String,               //can be either "in-progress" or "fulfilled"){}
        public _id?:String
    ){}

}
