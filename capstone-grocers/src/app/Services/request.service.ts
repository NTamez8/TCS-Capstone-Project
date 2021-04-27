import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productRequest } from '../Classes/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public currentRequest:any;
  public viewRequestURL:any;

  constructor(private http:HttpClient) { }

 public getAllRequests():Observable<productRequest[]>{
    return this.http.get<productRequest[]>("http://localhost:8080/request/getAllRequests");
  }

  addRequest(){}

 


  sendRequest(productRef:any){
    this.http.post("http://localhost:8080/request/sendRequest",productRef).
    subscribe(result=>console.log(result),error=>console.log(error));
  }

  resolveRequest(request_id:string){
    return this.http.post<{token:string}>("http://localhost:8080/request/resolveRequest",{request_id});
  }
}
