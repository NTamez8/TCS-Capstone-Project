
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Ticket} from '../Classes/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  constructor(private http:HttpClient) { }
  
  public raiseTicket(user:any){
    console.log(user);
    this.http.post("http://localhost:8080/ticket/addTicketInfo",user).
    subscribe(result=>console.log(result),error=>console.log(error))
  }

  getDetailOfUser():Observable<Ticket[]>{
    return this.http.get<Ticket[]>("http://localhost:8080/ticket/getDetailOfUser/")

  }
  

}
