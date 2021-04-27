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

  async deleteProduct(productRef:NgForm){
    const formValues = productRef.value;
    //console.log("Deleting Product");
    await this.productService.deleteProductById(formValues.product_id).subscribe(data=>console.log(data.token));
    this.viewProductComponent.getAllProducts();
  }
}
