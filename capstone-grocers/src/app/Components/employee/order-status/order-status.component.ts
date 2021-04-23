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
  constructor(public orderSer:OrderService) { }

  ngOnInit(): void {
  }
  serchorderDetails(id:any){
    this.orderSer.retriveOrderById(id).subscribe(result=>{
      if(result.length>0){
  this.resultMsg = " Id is  "+ result[0]._id  
      }else{
  this.resultMsg="Id is not Present"
      }
      
    })
  }
  updateStatus(orderRef:any){
    console.log(orderRef)
    this.orderSer.updateOrderStatus(orderRef).subscribe((result:string)=>{
      this.updateMsg=result;
    })


  
  }

}