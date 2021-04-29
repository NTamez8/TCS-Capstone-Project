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

  // if we try doing this from the viewProductComponent, it will not properly update the products
  async getAllProducts(){
    this.viewProductComponent.single = false;
    await this.productService.getAllProducts().subscribe(result=>this.productService.currentProducts=result,error=>console.log(error));
  }

  // if the product exists, delete it
  async deleteProduct(productRef:NgForm){
    try{
      // grab product deletion form values
      const formValues = productRef.value;
      if(this.productService.productExists(formValues.product_id as String)){
      await this.productService.deleteProductById(formValues.product_id as string).subscribe(data=>{
        alert(data.message);
        this.getAllProducts();
      });
      // refresh products
      this.viewProductComponent.getAllProducts();
    }else{
      alert("Please enter a valid Product ID!");
    }
    }catch(tryError){
      alert(tryError);
    }
  }
}
