import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivateChild, CanActivate {
  constructor(private http:HttpClient,private employeeService:AdminService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(sessionStorage.getItem("adminToken") == null){
      return false;
    }

    let token = "bearer " + sessionStorage.getItem("adminToken");
    return this.employeeService.validate(token);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage.getItem("employeeToken") == null){
      return false;
    }

    let token = "bearer " + sessionStorage.getItem("employeeToken");
    return this.employeeService.validate(token);
  }
  
}
