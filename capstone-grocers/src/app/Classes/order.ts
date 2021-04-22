export class Order {
    constructor(
        public u_username:String,
        public cart:String,                //stringified JSON of user's cart (Product[])
        public datetime_requested:String,
        public status:String,               //can be either "in-progress" or "fulfilled"
        public datetime_fulfilled?:String,
        public _id?:String
    ){}

}
