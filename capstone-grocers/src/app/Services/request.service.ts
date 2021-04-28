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

  getRequestById(request_id:any):Observable<productRequest[]>{
    return this.http.get<productRequest[]>("http://localhost:8080/request/getRequestById/"+request_id);
  }

  getAllRequests():Observable<productRequest[]>{
    return this.http.get<productRequest[]>("http://localhost:8080/request/getAllRequests");
  }

  addRequest(){}

 


  sendRequest(productRef:any){
    // changed response type
    return this.http.post("http://localhost:8080/request/sendRequest",productRef,{responseType:"text"});
  }

  resolveRequest(request_id:string){
    return this.http.post<{token:string}>("http://localhost:8080/request/resolveRequest",{request_id});
  }
}
