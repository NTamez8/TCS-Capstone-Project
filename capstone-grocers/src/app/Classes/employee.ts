export class Employee {
    constructor(
        public firstName:String,
        public lastName:String,
        public email_address:String,
        public e_password:String,          //must be auto-generated when employee is first added by the admin
        public first_login:Boolean    
    ){}

}
