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

  // ------------------------------------------Adding changes to cart-----------------------------------
  addProductDetailsInfo(productRef:any){
    this.http.post("http://localhost:8080/user/select-item",
     productRef).subscribe(result => console.log(result), error=> console.log(error))
  }

  
}
