import { Component, OnInit } from '@angular/core';
import {OrderService} from 'src/app/Services/order.service'


@Component({
  selector: 'app-view-order-status',
  templateUrl: './view-order-status.component.html',
  styleUrls: ['./view-order-status.component.css']
})
export class ViewOrderStatusComponent implements OnInit {

  orderStatus: any;
  constructor(public orderSer:OrderService) { }

   ngOnInit(): void {
  }
  viewStatus(vieworderRef:any){
    console.log(vieworderRef)
    this.orderSer.viewOrderStatus(vieworderRef).subscribe((result:any)=>{
      this.orderStatus=result.Message;
    })
   }}