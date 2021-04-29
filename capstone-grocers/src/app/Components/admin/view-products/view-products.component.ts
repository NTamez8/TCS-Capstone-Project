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

  // viewing single/multiple Products
  public single:any;
  // error popup message variables
  public invalidProduct:Boolean = false;

  // get all Products during initialization
  ngOnInit(): void {
    this.getAllProducts();
  }

  // get Product index
  getProductIndex(product:Product){
    // get index from Product Service
    return this.productService.currentProducts.findIndex((product)=>this.productService.currentProduct[0]._id == product._id);
  }

  // get all Products
  async getAllProducts(){
    // viewing all Products
    this.single = false;
    await this.productService.getAllProducts().subscribe(result=>this.productService.currentProducts=result,error=>console.log(error));
  }

  // get Product by id
  async getProductById(productRef:NgForm){
    // update Products before checking for valid ID
    let product_order = productRef.value.product_order;
    this.getAllProducts();
    let product_id = this.productService.currentProducts[product_order-1]?._id;
    // check for valid Product ID
    if(this.productService.productExists(product_id as String)){
      this.invalidProduct = false;
      await this.productService.getProductById(product_id as String).subscribe(result=>this.productService.currentProduct=result,error=>console.log(error));
      // viewing a single Product
      this.single = true;
    }else{
      this.invalidProduct = true;
    }
  };

  // delete Product
  async deleteProduct(product:Product){
    // delete the Product from the Product Service then refresh Products
    await this.productService.deleteProductById(product._id as string).subscribe(data=>{
      this.getAllProducts();
    });
  };
}
