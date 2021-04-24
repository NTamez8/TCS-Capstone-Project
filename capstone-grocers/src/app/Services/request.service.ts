import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Request} from '../Classes/request';
import { Subscriber, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public http:HttpClient) { }

  sendRequest(productRef:any){
    this.http.post("http://localhost:8080/request/sendRequest",productRef).
    subscribe(result=>console.log(result),error=>console.log(error))
  }
}
