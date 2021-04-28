import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productRequest } from '../Classes/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public currentRequest:Array<productRequest> = [];
  public viewRequestURL:any;
  public currentRequests:Array<productRequest> = [];

  constructor(private http:HttpClient) { }

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

  getAllRequests():Observable<productRequest[]>{
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.get<productRequest[]>("http://localhost:8080/request/getAllRequests",{headers:{'Authorization':token}});
  }

  getRequestById(request_id:any):Observable<productRequest[]>{
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.get<productRequest[]>("http://localhost:8080/request/getRequestById/"+request_id,{headers:{'Authorization':token}});
  }

  addRequest(){}

 


  sendRequest(productRef:any){
    // changed response type
    return this.http.post("http://localhost:8080/request/sendRequest",productRef,{responseType:"text"});
  }

  resolveRequest(request_id:string){
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<{token:string}>("http://localhost:8080/request/resolveRequest",{request_id},{headers:{'Authorization':token}});
  }

  deleteRequestById(request_id:String){
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<{token:string}>("http://localhost:8080/request/deleteRequestById",{request_id},{headers:{'Authorization':token}});
  }
}
