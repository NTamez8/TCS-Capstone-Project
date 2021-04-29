import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // error popup message variable
  public invalidCredentials:Boolean = false;

  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
  }

  // try to sign-in
  a_signIn(a_loginRef:NgForm){
    const a_credentials = a_loginRef.value;
    this.adminService.signIn(a_credentials.a_username,a_credentials.a_password).subscribe(data=>{
      // if there is a message, then sign-in was successful
      if(data.message){
        this.invalidCredentials = false;
        sessionStorage.setItem('adminToken',data.token);
        sessionStorage.setItem('adminUser',a_credentials.a_username);
        this.router.navigateByUrl('adminPanel');
      }else{
        this.invalidCredentials = true;
      }
    });
  }

}