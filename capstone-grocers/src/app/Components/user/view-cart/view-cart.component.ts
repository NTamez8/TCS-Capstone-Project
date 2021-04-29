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
  
    this.userServ.viewItemsfromCart().subscribe(result=>{
     
      this.products=result
   },error=>console.log(error));
  }

  deleteProduct(id?:String)
  {
    if(id == null)
    id = ''
    this.userServ.deleteCartItemById(id).subscribe(data=>{
      console.log(data);
      this.viewAllProducts();
    })
  }

}
