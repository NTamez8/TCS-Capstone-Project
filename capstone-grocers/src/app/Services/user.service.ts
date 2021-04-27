import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
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
  public signIn(email: string, pass: string) {
    return this.http.post < {
      token: string
    } > ('http://localhost:8080/user/signIn', {
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


  // ------------------------------------------Adding changes to cart-----------------------------------
  public addProductsToCartInfo(product: Product) {
    this.http.post("http://localhost:8080/user/addProductsToCartInfo",
      {product}).subscribe(result => console.log(result), error => console.log(error))
  }

  public deleteProductfromCart(product_id:String){
    return this.http.delete<{token:string}>("http://localhost:8080/user/deleteProductfromCart/"+product_id);
  }
  
  public viewAllProductsinCart():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8080/user/viewAllProductsinCart");
  }
  public viewCheckoutCart(user:User){
    return this.http.post('http://localhost:8080/user/checkoutCart/',user);
  }

  public updatestatusToUser(userRef: any): any {
    return this.http.put("http://localhost:8080/user/updatestatusToUser", userRef, {
      responseType: 'text'
    })

  }
  public editPassword(passwordRef:any):any{
    return this.http.put("http://localhost:8080/user/editPassword",passwordRef,{responseType:'text'})
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
