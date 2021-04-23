import { Product } from "./product";

export class Order {
    constructor(
        public user_ID:String,
        public cart:[cartItem],                //stringified JSON of user's cart (Product[])
        public datetime_requested:Date,
        public status:String,               //can be either "in-progress" or "fulfilled"
        public datetime_fulfilled?:Date,
        public _id?:String
    ){}

}
class cartItem{
    constructor(
        public product:Product,
        public quantity:number
    ){}
}
