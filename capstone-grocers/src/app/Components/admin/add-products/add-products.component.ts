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

  async addProduct(productRef:NgForm){
    const p_values = productRef.value;
    const product = new Product(p_values.p_name,p_values.p_description,p_values.p_price,p_values.p_quantity);
    console.log("Adding Product!");
    await this.productService.addProduct(product).subscribe(data=>{ 
      console.log(data.token);
      //sessionStorage.setItem('token',data.token);
    });
    await this.viewProductComponent.getAllProducts();
  }

}
