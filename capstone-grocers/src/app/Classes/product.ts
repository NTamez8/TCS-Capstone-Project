export class Product {
    constructor(
        public name:String,
        public description:String,
        public price:number,
        public quantity:number,
        public _id?:String
    ){}

}

export class ProductMessage {
    constructor(
        public data:Product,
        public message:String
    ){}
}

