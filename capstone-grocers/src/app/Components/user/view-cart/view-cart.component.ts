import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Classes/product';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  products: {product:Product,quantity:number}[] = [];
  constructor(private userServ:UserService) { }

  ngOnInit(): void {
    this.viewAllProducts();
  }

  viewAllProducts(){
    console.log("View products in Cart");
    this.userServ.viewItemsfromCart().subscribe(result=>{
      console.log(result);
      this.products=result
    console.log(this.products)},error=>console.log(error));
  }

}
