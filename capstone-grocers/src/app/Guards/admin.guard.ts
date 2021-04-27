import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild, CanActivate {
  constructor(private http:HttpClient,private adminService:AdminService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(sessionStorage.getItem("adminToken") == null){
      return false;
    }

    let token = "bearer " + sessionStorage.getItem("adminToken");
    return this.adminService.validate(token);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage.getItem("adminToken") == null){
      return false;
    }

    let token = "bearer " + sessionStorage.getItem("adminToken");
    return this.adminService.validate(token);
  }
  
}
