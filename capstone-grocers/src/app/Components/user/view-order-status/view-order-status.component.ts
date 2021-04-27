import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-order-status',
  templateUrl: './view-order-status.component.html',
  styleUrls: ['./view-order-status.component.css']
})
export class ViewOrderStatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.orderSer.getOrderStatus().subscribe(result=>this.orderStatus=result);
  }

}
