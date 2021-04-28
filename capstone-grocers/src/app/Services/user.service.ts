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
  updateProfile(updateProfileRef:any):any{
    return this.http.put("http://localhost:8080/user/updateProfile",updateProfileRef,{responseType:'text'})
  }
  updatePassword(passwordRef:any):any{
    return this.http.put("http://localhost:8080/user/updatePassword",passwordRef,{responseType:'text'})
  }
  public loadFunds(fundsRef: any){
    console.log(fundsRef);
    return this.http.put("http://localhost:8080/user/loadFunds",fundsRef,{responseType:"text"})
  }
  checkFunds(id:string, cost:number){

    let newobj = {
      id,
      cost
    }
    let funds: any;
    this.http.post("http://localhost:8080/user/checkFunds", newobj, {responseType:'text'}).
    subscribe((res:any) => {
      console.log("Funds", res);
      funds = res;
    }, err => console.log(err));
    return funds;
  }

}
