import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  productSelector:string = "1";

  constructor() { }

  ngOnInit(): void {
  }

  changedValue(selector: any) {
    this.productSelector = selector;
  }
}
