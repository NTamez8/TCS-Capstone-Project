import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
  }

  a_signIn(a_loginRef:NgForm){
    const a_credentials = a_loginRef.value;
    this.adminService.signIn(a_credentials.a_username,a_credentials.a_password);
  }

}
