export class Request {
    constructor(
        public e_username:String,              //employee who requested the change
        public product_id:Number,              //_id in "productModel.js"
        public new_quantity:Number,
        public datetime_requested:String,
        public datetime_resolved:String,
        public status:String                   //can be either "in-progress" or "resolved"
        ){}

}
