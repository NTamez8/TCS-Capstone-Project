import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Order} from '../Classes/order';
import { Subscriber, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http:HttpClient) { }
  retriveOrderById(id:any):Observable<Order[]>{
    return this.http.get<Order[]>("http://localhost:8080/order/retriveOrderById/"+id)
  }
  updateOrderStatus(orderRef:any):any{
    return this.http.put("http://localhost:8080/order/updateOrderStatus",orderRef,{responseType:'text'})

}

}
