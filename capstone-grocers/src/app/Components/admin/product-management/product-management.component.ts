import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  // default product selector to the product view component
  public productSelector:string = "1";

  constructor() { }

  ngOnInit(): void {
  }

  // set the product selection
  changedValue(selector: any) {
    this.productSelector = selector;
  }
}
