import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private http:HttpClient){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(sessionStorage.getItem('token') == null)
        return false;


       
        let token = 'bearer ' + sessionStorage.getItem('token');
      
        
      
        return new Promise<boolean>((resolve,reject)=>{

          this.http.get('http://localhost:8080/user/isValid',{headers:{"Authorization":token}}).subscribe((data)=>{
           
            resolve(true);
          },err=>{
           
            reject(err);
          })


        })
       
       
      

    
    
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('token') == null)
      return false;


     
      let token = 'bearer ' + sessionStorage.getItem('token');
    
      
    
      return new Promise<boolean>((resolve,reject)=>{

        this.http.get('http://localhost:8080/user/isValid',{headers:{"Authorization":token}}).subscribe((data)=>{
          
          resolve(true);
        },err=>{
          console.log(err);
          reject(err);
        })


      })
  }
  
}
