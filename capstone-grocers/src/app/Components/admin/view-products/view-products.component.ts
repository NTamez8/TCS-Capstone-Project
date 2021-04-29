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

  // get product index
  getProductIndex(product:Product){
    // get index from product service
    return this.productService.currentProducts.findIndex((product)=>this.productService.currentProduct[0]._id == product._id);
  }

  // get all products
  async getAllProducts(){
    // viewing all products
    this.single = false;
    await this.productService.getAllProducts().subscribe(result=>this.productService.currentProducts=result,error=>console.log(error));
  }

  // get product by id
  async getProductById(productRef:NgForm){
    // update Products before checking for valid ID
    let product_order = productRef.value.product_order;
    this.getAllProducts();
    let product_id = this.productService.currentProducts[product_order-1]?._id;
    // check for valid Product ID
    if(this.productService.productExists(product_id as String)){
      await this.productService.getProductById(product_id as String).subscribe(result=>this.productService.currentProduct=result,error=>console.log(error));
      // now viewing a single product
      this.single = true;
    }else{
      alert("Product does not exist!");
    }
  };

  // delete product
  async deleteProduct(product:Product){
    // delete the product from the product service then refresh products
    await this.productService.deleteProductById(product._id as string).subscribe(data=>{
      alert(data.message);
      this.getAllProducts();
    });
  };
}
