import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Classes/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  public products:Array<Product> = [];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  getAllProducts(){
    //console.log("Getting products");
    this.productService.getAllProducts().subscribe(result=>this.products=result,error=>console.log(error));
  }

  getProductById(){
    //console.log("Getting product by ID");
    const test_id = "608331bf4e5c0b3488695b40";
    this.productService.getProductById(test_id).subscribe(result=>this.products=result,error=>console.log(error));
  }
}
