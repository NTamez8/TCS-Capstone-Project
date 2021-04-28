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

  public single:any;

  ngOnInit(): void {
    this.getAllProducts();
  }

  getProductIndex(product:Product){
    return this.productService.currentProducts.findIndex((product)=>this.productService.currentProduct[0]._id == product._id);
  }

  async getAllProducts(){
    //console.log("Getting products");
    this.single = false;
    await this.productService.getAllProducts().subscribe(result=>this.productService.currentProducts=result,error=>console.log(error));
  }

  async getProductById(productRef:NgForm){
    //update Products before checking for valid ID
    let product_order = productRef.value.product_order;
    this.getAllProducts();
    let product_id = this.productService.currentProducts[product_order-1]?._id;
    //check for valid Product ID
    if(this.productService.productExists(product_id as String)){
      await this.productService.getProductById(product_id).subscribe(result=>this.productService.currentProduct=result,error=>console.log(error));
      this.single = true;
      //console.log(this.productService)
    }else{
      alert("Product does not exist!");
    }
  };

  async deleteProduct(product:Product){
    await this.productService.deleteProductById(product._id as string).subscribe(data=>console.log(data.token));
    this.getAllProducts();
  };
}
