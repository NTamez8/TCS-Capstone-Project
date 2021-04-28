import { Order } from 'src/app/Classes/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  resultMsg?:string;
  updateMsg?:string;
  details?:Array<Order>
  constructor(public orderSer:OrderService) { }

  ngOnInit(): void {
    this.orderSer.retriveOrderById().subscribe(result=>{this.details=result; console.log(result)})

  }
  // serchorderDetails(id:any){
  //   this.orderSer.retriveOrderById(id).subscribe(result=>{
  //     if(result.length>0){
  // this.resultMsg = " Id is  "+ result[0]._id +" username is  " +result[0].user_ID+ "  status is "+result[0].status
  //     }else{
  // this.resultMsg="Id is not Present"
  //     }
      
  //   })
  // }
  updateStatus(orderRef:any){
    console.log(orderRef)
    this.orderSer.updateOrderStatus(orderRef).subscribe((result:any)=>{
      this.updateMsg=result.Message;
    })


  
  }

}