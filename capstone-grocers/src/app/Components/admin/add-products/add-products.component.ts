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

  priceError:Boolean = false;
  quantityError:Boolean = false;

  constructor(public viewProductComponent:ViewProductsComponent, private productService:ProductService) { }

  ngOnInit(): void {
  }

  // form validation
  productFormValidation(productRef:NgForm){
    const p_values = productRef.value;
    // if the price and quantity are valid, add the Product
    if(p_values.p_price >= 0 && p_values.p_quantity >= 0){
      this.quantityError = false;
      this.priceError = false;
      this.addProduct(productRef);
    }else{
      // if the price is not valid, display error message
      if(p_values.p_price < 0){
        this.priceError = true;
      }else{
        this.priceError = false;
      }
      // if the quantity is not valid, display error message
      if(p_values.p_quantity < 0){
        this.quantityError = true;
      }else{
        this.quantityError = false;
      }
    }
  };

  // add a Product
  async addProduct(productRef:NgForm){
    // get form values
    const p_values = productRef.value;
    // make a new Product
    const product = new Product(p_values.p_name,p_values.p_description,p_values.p_price,p_values.p_quantity);

    // add the Product and refresh the Products
    await this.productService.addProduct(product).subscribe(data=>{ 
      this.viewProductComponent.getAllProducts();
    });
  }

}
