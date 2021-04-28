import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private employeeService:EmployeeService,private router:Router) { }

  ngOnInit(): void {
  }

  e_signIn(e_loginRef:NgForm){
    const e_credentials = e_loginRef.value;
    this.employeeService.signIn(e_credentials.email_address,e_credentials.e_password).subscribe(data=>{
      sessionStorage.setItem('employeeToken',data.token);
      sessionStorage.setItem('employeeUser',e_credentials.email_address);
      this.router.navigateByUrl('employeePanel');
    });
  }

}