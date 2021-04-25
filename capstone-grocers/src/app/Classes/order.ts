import { Product } from "./product";

export class Order {
    constructor(
<<<<<<< HEAD
        public user_ID:String,
        public cart:[cartItem],                //stringified JSON of user's cart (Product[])
        public datetime_requested:Date,
        public status:String,               //can be either "in-progress" or "fulfilled"
        public datetime_fulfilled?:Date,
        public _id?:String
=======
        public _id:String,
        public u_username:String,
        public cart:String,                //stringified JSON of user's cart (Product[])
        public datetime_requested:String,
        public datetime_fulfilled:String,
        public status:String,               //can be either "in-progress" or "fulfilled"){}
        
>>>>>>> pruthvi
    ){}

}
class cartItem{
    constructor(
        public product:Product,
        public quantity:number
    ){}
}
