import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    this.getAllProducts();
  }

  getAllProducts(){
    //console.log("Getting products");
    this.productService.getAllProducts().subscribe(result=>this.products=result,error=>console.log(error));
  }

  getProductById(productRef:NgForm){
    //console.log("Getting product by ID");
    this.productService.getProductById(productRef.value.product_id).subscribe(result=>this.products=result,error=>console.log(error));
  }

  async deleteProduct(product:Product){
    await this.productService.deleteProductById(product._id as string).subscribe(data=>console.log(data.token));
    this.getAllProducts();
  };
}
