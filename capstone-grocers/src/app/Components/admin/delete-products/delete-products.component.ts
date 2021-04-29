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

  constructor(public viewProductComponent:ViewProductsComponent,private productService:ProductService) { }

  ngOnInit(): void {
  }

  async getAllProducts(){
    //console.log("Getting products");
    this.viewProductComponent.single = false;
    await this.productService.getAllProducts().subscribe(result=>this.productService.currentProducts=result,error=>console.log(error));
  }

  async deleteProduct(productRef:NgForm){
    try{
      if(this.productService.productExists(productRef.value.product_id as String)){
        const formValues = productRef.value;
      //console.log("Deleting Product");
      await this.productService.deleteProductById(formValues.product_id as string).subscribe(data=>{
        alert(data.message);
        this.getAllProducts();
      });
      this.viewProductComponent.getAllProducts();
    }else{
      alert("Please enter a valid Product ID!");
    }
    }catch(tryError){
      alert(tryError);
    }
  }
}
