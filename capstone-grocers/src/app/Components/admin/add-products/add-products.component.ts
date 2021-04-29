import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/Classes/product';
import { ViewProductsComponent } from 'src/app/Components/admin/view-products/view-products.component';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(public viewProductComponent:ViewProductsComponent, private productService:ProductService) { }

  ngOnInit(): void {
  }

  // form validation
  productFormValidation(productRef:NgForm){
    const p_values = productRef.value;
    if(p_values.p_price >= 0 && p_values.p_quantity >= 0){
      this.addProduct(productRef);
    }else{
      alert("Quantity and Price must be >= 0!");
    }
  }

  // add a product
  async addProduct(productRef:NgForm){
    // get form values
    const p_values = productRef.value;
    // make a new product
    const product = new Product(p_values.p_name,p_values.p_description,p_values.p_price,p_values.p_quantity);

    // add the product and refresh the products
    await this.productService.addProduct(product).subscribe(data=>{ 
      this.viewProductComponent.getAllProducts();
    });
  }

}
