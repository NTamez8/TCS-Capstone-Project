<<<<<<< HEAD
<<<<<<< HEAD
=======
import { Ticket } from './../Classes/ticket';
import { Observable } from 'rxjs';
>>>>>>> pruthvi
=======
import { Ticket } from './../Classes/ticket';
import { Observable } from 'rxjs';
>>>>>>> sruthti
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Ticket} from '../Classes/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

<<<<<<< HEAD
<<<<<<< HEAD
  constructor(private http:HttpClient) { }
  
  sendTicket(ticketRef:any){
    this.http.post("http://localhost:8080/ticket/sendTicket",ticketRef).
    subscribe(result=>console.log(result),error=>console.log(error))
  }
=======
=======
>>>>>>> sruthti
  constructor(public http:HttpClient) { }
  getDetailOfUser():Observable<Ticket[]>{
    return this.http.get<Ticket[]>("http://localhost:8080/ticket/getDetailOfUser/")

  }
  
<<<<<<< HEAD
>>>>>>> pruthvi
=======
>>>>>>> sruthti
}
