import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  updateProduct(productRef:NgForm){
    const formValues = productRef.value;
    console.log("Updating Product");
    this.productService.updateProduct(formValues.product_id,formValues.product_newQuantity).subscribe(data=>console.log(data.token));
  }
}
