import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  products: any[] = [];
  constructor(private userServ:UserService) { }

  ngOnInit(): void {
  }

  viewAllProducts(){
    console.log("View products in Cart");
    this.userServ.viewItemsfromCart().subscribe(result=>this.products=result,error=>console.log(error));
  }

}
