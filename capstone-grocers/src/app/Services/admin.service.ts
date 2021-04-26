import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  signIn(a_username:String,a_password:String){
    return this.http.post<{token:string}>('http://localhost:8080/admin/signIn',{a_username,a_password});
  };

  // validate(token:string):Promise<boolean>{
  //   return new Promise<boolean>((resolve, reject) => {

  //     // try changing the response type to text and seeing how that effects the response
  //     this.http.get('http://localhost:8080/admin/isValid', {
  //       headers: {
  //         "Authorization": token
  //       },
  //       responseType:'text'
  //     }).subscribe((data)=>{
  //       resolve(true);
  //     },error=>{
  //       reject(error);
  //     });

  //   });
  // }

}
