import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  signIn(a_username:String,a_password:String){
    return this.http.post<{token:String}>('http://localhost:8080/admin/signIn',{a_username,a_password});
  };

}
