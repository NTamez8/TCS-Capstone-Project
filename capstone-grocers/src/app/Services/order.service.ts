import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Order
} from '../Classes/order';
import {
  Subscriber,
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

   root = 'http://localhost:8080';

  constructor(public http: HttpClient) {}
  
 

  getOrdersByDay(date:String):Observable<Order[]>
  {
    return this.http.post<Order[]>(this.root+'/order/getOrderByDay',{"day":date});
  }
  getOrdersByWeek(week:String):Observable<Order[]>
  {
    return this.http.post<Order[]>(this.root+'/order/getOrderByWeek',{"dateStart":week});
  }
  getOrdersByMonth(month:String):Observable<Order[]>
  {
    return this.http.post<Order[]>(this.root+'/order/getOrderByMonth',{"monthStart":month});
  }
  getOrdersByProd(id:String):Observable<Order[]>
  {
    return this.http.get<Order[]>(this.root+'/order/getOrderByProdId/' + id );
  }
  getOrdersByCust(id:String):Observable<Order[]>
  {
    return this.http.get<Order[]>(this.root+'/order/getOrdersByCust/' + id);
  }
  retriveOrderById():Observable<Order[]>{
      return this.http.get<Order[]>(this.root+"/order/retriveOrderById/")
    }

  // retriveOrderById(id:any):Observable<Order[]>{
  //   return this.http.get<Order[]>(this.root+"/order/retriveOrderById/"+id)
  // }
  // getDetailOfUser():Observable<Order[]>{
  //   return this.http.get<Order[]>(this.root+"/ticket/getDetailOfUser/")

  // }
  updateOrderStatus(orderRef:any):any{
    return this.http.put(this.root+"/order/updateOrderStatus",orderRef)

}

getOrderStatus(status:any):Observable<Order[]>{
  return this.http.get<Order[]>(this.root+"/order/getOrderstatus/"+status)
}
  viewOrderStatus(status:any):Observable<Order[]>{
  return this.http.get<Order[]>(this.root+"/order/viewOrderstatus/"+status)
}
getUserOrders()
{
  let token = 'bearer ' + sessionStorage.getItem('token');
  return this.http.get<Order[]>(this.root+'/order/getUserOrder',{headers:{"Authorization":token}})
}

}
