import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Classes/product';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent implements OnInit {
  constructor(private userServ:UserService, public productSer:ProductService) { }
  products?:Array<Product>
  ngOnInit(): void {
    this.productSer.getAllProducts().subscribe((result: any)=>this.products = result);
  }
  addProductCart(productRef:any){
    console.log(productRef)
    this.userServ.addProductsToCartInfo(productRef)
  }

  
}
