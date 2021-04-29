import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Classes/order';
import {OrderService} from 'src/app/Services/order.service'


@Component({
  selector: 'app-view-order-status',
  templateUrl: './view-order-status.component.html',
  styleUrls: ['./view-order-status.component.css']
})
export class ViewOrderStatusComponent implements OnInit {

  orderStatus: any;
  orders:Order[]=[]
  constructor(public orderSer:OrderService) { }

   ngOnInit(): void {
     this.orderSer.getUserOrders().subscribe(data=>{
       this.orders = data;
       console.log(data);
     })
  }
  viewStatus(vieworderRef:any){
    console.log(vieworderRef)
    this.orderSer.viewOrderStatus(vieworderRef).subscribe((result:any)=>{
      this.orderStatus=result.Message;
    })
   }
   
}