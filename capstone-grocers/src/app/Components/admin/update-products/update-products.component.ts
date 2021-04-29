import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { RequestService } from 'src/app/Services/request.service';
import { ViewProductsComponent } from 'src/app/Components/admin/view-products/view-products.component';


@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  // client-side errors for popup messages
  public invalidProduct:Boolean = false;
  public quantityError: Boolean = false;
  
  public product_id:any;
  public new_quantity:any;

  constructor(public viewProductComponent:ViewProductsComponent,private productService:ProductService, private requestService:RequestService, private router:Router) { }

  ngOnInit(): void {

  }

  // form validation
  productFormValidation(){
    if(this.new_quantity >= 0){
      this.quantityError = false;
      this.updateProduct();
    }else{
      if(this.productService.productExists(this.product_id as String)){
        this.invalidProduct = false;
      }else{
        this.invalidProduct = true;
      }
      this.quantityError = true;
    }
  }

  // update Product quantity
  async updateProduct(){
    try{
      // if the product ID exists, update the product quantity
      if(this.productService.productExists(this.product_id as String)){
        this.invalidProduct = false;
        await this.productService.updateProduct(this.product_id,this.new_quantity).subscribe((data)=>{
          this.viewProductComponent.getAllProducts();
        });
      }else{
        this.invalidProduct = true;
      }
    }catch(tryError){
      console.log(tryError);
    }
  }
}
