import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  msg: any;
  router: any;

  constructor(private userServ:UserService) { }

  ngOnInit(): void {
  }
  checkoutToCart(cartRef:any){
    console.log(cartRef)
    this.userServ.viewCheckoutCart(cartRef).subscribe((result:any)=>{
      this.msg=result.Message;
      this.router.navigate(['viewOrderStatus'])
    })
  }

}
