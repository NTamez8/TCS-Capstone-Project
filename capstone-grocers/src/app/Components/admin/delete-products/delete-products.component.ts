import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewProductsComponent } from 'src/app/Components/admin/view-products/view-products.component';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html',
  styleUrls: ['./delete-products.component.css']
})
export class DeleteProductsComponent implements OnInit {

  public invalidProduct = false;

  constructor(public viewProductComponent:ViewProductsComponent,private productService:ProductService) { }

  ngOnInit(): void {
  }

  // if we try doing this from the viewProductComponent, it will not properly update the Products
  async getAllProducts(){
    this.viewProductComponent.single = false;
    await this.productService.getAllProducts().subscribe(result=>this.productService.currentProducts=result,error=>console.log(error));
  }

  // if the Product exists, delete it
  async deleteProduct(productRef:NgForm){
    try{
      // grab Product deletion form values
      const formValues = productRef.value;
      if(this.productService.productExists(formValues.product_id as String)){
        this.invalidProduct = false;
      await this.productService.deleteProductById(formValues.product_id as string).subscribe(data=>{
        this.getAllProducts();
      });
      // refresh Products
      this.viewProductComponent.getAllProducts();
    }else{
      this.invalidProduct = true;
    }
    }catch(tryError){
      console.log(tryError);
    }
  }
}
