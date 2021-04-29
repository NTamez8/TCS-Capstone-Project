import { Product } from "./product";
export class User {
    static cart: any;
    constructor(
        
        public firstName:String,
        public lastName:String,
        public u_username:String,
        public u_password:String,
        public address:String,
        public phone_number:Number,
        public date_of_birth:String,
        public accountN?:String,
        public cart?:[cartItem],
        public locked?:Boolean,
        public funds?:Number, 
        public order_history?:String,            //stringified JSON of order array (Order[]) 
        public _id?:String,
        
        ){}

}
class cartItem{
    constructor(
        public product:Product,
        public quantity:number
    ){}
}
