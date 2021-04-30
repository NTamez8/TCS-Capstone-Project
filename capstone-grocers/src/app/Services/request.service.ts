import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productRequest } from '../Classes/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  // Request URL
  public viewRequestURL:any;
  // both need to be Arrays because of how Observables are returned from the HttpClient
  public currentRequest:Array<productRequest> = [];
  public currentRequests:Array<productRequest> = [];

  constructor(private http:HttpClient) { }

  // test if a Request exists based off of its ID
  requestExists(request_id:String):Boolean{
    if(request_id){
      let requestExists = false;
      this.currentRequests.forEach(function(request){
        if(request._id == request_id){
          requestExists =  true;
        }
      });
      return requestExists;
    }else{
      return false;
    }
  };

  // get all Requests
  getAllRequests():Observable<productRequest[]>{
    // sending Admin validation to backend
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.get<productRequest[]>("http://localhost:8080/request/getAllRequests",{headers:{'Authorization':token}});
  }

  // get Request based on ID
  getRequestById(request_id:any):Observable<productRequest[]>{
    // sending Admin validation to backend
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.get<productRequest[]>("http://localhost:8080/request/getRequestById/"+request_id,{headers:{'Authorization':token}});
  }

  addRequest(){}

  // send a Request
  sendRequest(productRef:any){
    // changed response type
    let token = 'bearer ' + sessionStorage.getItem('token');
    return this.http.post("http://localhost:8080/request/sendRequest",productRef,{headers:{'Authorization':token},responseType:"text"});
  }

  // resolve a Request
  resolveRequest(request_id:string){
    // sending Admin validation to backend
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<{token:string}>("http://localhost:8080/request/resolveRequest",{request_id},{headers:{'Authorization':token}});
  }

  // delete a Request
  deleteRequestById(request_id:String){
    // sending Admin validation to backend
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post("http://localhost:8080/request/deleteRequestById",{request_id},{headers:{"Authorization":token} ,responseType:'text'});
  }
}
