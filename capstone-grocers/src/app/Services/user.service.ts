import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }



  public signUp(user:User)
  {
    console.log(user);
    return this.http.post<{token:string}>('http://localhost:8080/user/signUp',user);
  }
  public signIn(email:string,pass:string)
  {
    return this.http.post<{token:string}>('http://localhost:8080/user/signIn',{email,pass});
  }
  public editPassword(passwordRef:any):any{
    return this.http.put("http://localhost:8080//editPassword",passwordRef,{responseType:'text'})
  }
}
