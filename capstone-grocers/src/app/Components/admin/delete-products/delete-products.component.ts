import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html',
  styleUrls: ['./delete-products.component.css']
})
export class DeleteProductsComponent implements OnInit {

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  deleteProduct(productRef:NgForm){
    this.productService.deleteProduct(productRef.value.p_name);
  }

}
