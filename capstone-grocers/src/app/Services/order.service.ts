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

  constructor(public http: HttpClient) {}
  retriveOrderById(id: any): Observable < Order[] > {
    return this.http.get < Order[] > ("http://localhost:8080/order/retriveOrderById/" + id)
  }
  updateOrderStatus(orderRef: any): any {
    return this.http.put("http://localhost:8080/order/updateOrderStatus", orderRef, {
      responseType: 'text'
    })

  }

  getOrdersByDay(date:String):Observable<Order[]>
  {
    return this.http.post<Order[]>('http://localhost:8080/order/getOrderByDay',{"day":date});
  }
  getOrdersByWeek(week:String):Observable<Order[]>
  {
    return this.http.post<Order[]>('http://localhost:8080/order/getOrderByWeek',{"dateStart":week});
  }
  getOrdersByMonth(month:String):Observable<Order[]>
  {
    return this.http.post<Order[]>('http://localhost:8080/order/getOrderByMonth',{"monthStart":month});
  }
  getOrdersByProd(id:String):Observable<Order[]>
  {
    return this.http.get<Order[]>('http://localhost:8080/order/getOrderByProdId/' + id );
  }
  getOrdersByCust(id:String):Observable<Order[]>
  {
    return this.http.get<Order[]>('http://localhost:8080/order/getOrdersByCust/' + id);
  }
}
