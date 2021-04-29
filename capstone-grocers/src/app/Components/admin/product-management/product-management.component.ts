import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  // default Product selector to the Product View Component
  public productSelector:string = "1";

  constructor() { }

  ngOnInit(): void {
  }

  // set the Product selection
  changedValue(selector: any) {
    this.productSelector = selector;
  }
}
