import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  msg: any;


  constructor(private userServ:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  checkoutToCart(){
  
    this.userServ.checkoutCart().subscribe((result:any)=>{
      this.msg=result.msg;
      if(this.msg != 'Insufficient funds to checkout')
      this.router.navigateByUrl('/userPanel');
    })
  }

}
