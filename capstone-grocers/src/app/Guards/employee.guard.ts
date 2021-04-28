import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/Services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivateChild, CanActivate {
  constructor(private http:HttpClient,private empService:EmployeeService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(sessionStorage.getItem("employeeToken") == null){
      return false;
    }

    let token = "bearer " + sessionStorage.getItem("employeeToken");
    return this.empService.validate(token);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage.getItem("employeeToken") == null){
      return false;
    }

    let token = "bearer " + sessionStorage.getItem("employeeToken");
    return this.empService.validate(token);
  }
  
}
