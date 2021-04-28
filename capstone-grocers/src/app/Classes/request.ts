export class productRequest {
    constructor(
        public e_username:String,              //employee who requested the change
        public product_id:Number,              //_id in "productModel.js"
        public new_quantity:Number,
        public datetime_requested:String,
        public status:string,                   //can be either "in-progress" or "resolved"
        public datetime_resolved?:String,
        public _id?:String
        ){}

}

