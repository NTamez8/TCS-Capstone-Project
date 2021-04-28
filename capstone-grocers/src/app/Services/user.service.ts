import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import { Product } from '../Classes/product';
import {
  User
} from '../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  private currentUser = new BehaviorSubject<any>(null);

public getAllUsers():Observable<User[]>
{
  return this.http.get<User[]>('http://localhost:8080/user/getAll');
}

  public signUp(user: User) {
    console.log(user);
    return this.http.post < {
      token: string
    } > ('http://localhost:8080/user/signUp', user);
  }
  public signIn(email: string, pass: string) {return this.http.post < {token: string} > ('http://localhost:8080/user/signIn', {
      email,
      pass
    });
  
  }
  public validate(token: string): Promise < boolean > {
    return new Promise < boolean > ((resolve, reject) => {

      // try changing the response type to text and seeing how that effects the response
      this.http.get('http://localhost:8080/user/isValid', {
        headers: {
          "Authorization": token
        },
        responseType:'text'
      }).subscribe((data) => {
      
        resolve(true);
      }, err => {
       
        reject(err);
      })


    })
  }
  public getMe():Observable<User>
{
  return this.http.get<User>('http://localhost:8080/user/getMe');
}

  // ------------------------------------------Adding changes to cart-----------------------------------
  //this may have to be modified to accept only the user_id and the product
  
  public addItemstoCart(product: Product,quantityDesired:number) {
    let token = 'bearer ' + sessionStorage.getItem('token');
    return this.http.post<{token:string}>("http://localhost:8080/user/addItemstoCart",{product_ID:product._id,quantityDesired},{headers:{'Authorization':token}});
  }

  public deleteItemsfromCart(product:Product){
    let token = 'bearer ' + sessionStorage.getItem('token');
    return this.http.post<{token:string}>("http://localhost:8080/user/deleteItemsfromCart",{product},{headers:{'Authorization':token}});
  }

  public deleteCartItemById(id:String)
  {
    let token = 'bearer ' + sessionStorage.getItem('token');
    return this.http.delete("http://localhost:8080/user/deleteItemsfromCart/"+id,{headers:{'Authorization':token}});
  }
  public viewItemsfromCart():Observable<{product:Product,quantity:number}[]>{
    let token = 'bearer ' + sessionStorage.getItem('token');
    return this.http.get<{product:Product,quantity:number}[]>("http://localhost:8080/user/viewItemsfromCart",{headers:{'Authorization':token}});
  }
  public checkoutCart(){
    console.log('test');
    let token = 'bearer ' + sessionStorage.getItem('token');
    return this.http.get('http://localhost:8080/user/checkoutCart',{headers:{'Authorization':token}});
  }

  public unlockLockUser(userRef: any): any {
    return this.http.put("http://localhost:8080/user/unlockLockUser", userRef, {
      responseType: 'text'
    })

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
