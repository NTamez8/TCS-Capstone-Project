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

  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts(){
    //console.log("Getting products");
    await this.productService.getAllProducts().subscribe(result=>this.productService.currentProducts=result,error=>console.log(error));
  }

  async getProductById(product_id:String){
    //console.log("Getting product by ID");
    await this.productService.getProductById(product_id).subscribe(result=>this.productService.currentProducts=result,error=>console.log(error));
  }

  async deleteProduct(product:Product){
    await this.productService.deleteProductById(product._id as string).subscribe(data=>console.log(data.token));
    this.getAllProducts();
  };
}
