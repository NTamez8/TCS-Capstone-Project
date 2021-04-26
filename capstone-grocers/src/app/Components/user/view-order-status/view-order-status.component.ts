import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { OrderStatusComponent } from '../../employee/order-status/order-status.component';

@Component({
  selector: 'app-view-order-status',
  templateUrl: './view-order-status.component.html',
  styleUrls: ['./view-order-status.component.css']
})
export class ViewOrderStatusComponent implements OnInit {
  status?:Array<OrderStatusComponent>
  constructor(public orderSer:OrderService) { }

  ngOnInit(): void {
    //this.orderSer.getOrderStatus().subscribe(result=>this.orderStatus=result);

}
}
