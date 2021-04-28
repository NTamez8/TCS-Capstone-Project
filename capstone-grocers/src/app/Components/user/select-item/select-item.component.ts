import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent implements OnInit {
  

  //create an array to hold the product you get from productServ

  constructor(private userServ:UserService,private productServ:ProductService) { }

  ngOnInit(): void {
    // add call to productServ.getAllProducts()
  }

  //this should be called by the button for add to cart and it should send the product_id and the current user_id
  //the current user_id can be gotten from the token by using the getMe route for a user.
  //there is no service that does this so you will have to implement. the token is saved is sessionStorage under token
  //
  addProductCart(productRef:any){
    console.log(productRef)
    this.userServ.addProductsToCartInfo(productRef)
  }

  

  
}
