export class productRequest {
    constructor(
        public employee_id:String,              //employee who requested the change
        public product_id:String,              //_id in "productModel.js"
        public product_name:String,
        public new_quantity:Number,
        public datetime_requested:String,
        public status:string,                   //can be either "in-progress" or "resolved"
        public datetime_resolved?:String,
        public _id?:String
        ){}

}

