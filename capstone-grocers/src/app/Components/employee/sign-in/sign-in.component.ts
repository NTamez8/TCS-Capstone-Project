import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router:Router,private empServ:EmployeeService) { }

  ngOnInit(): void {
  }

  login(empRef:any)
  {
    
    this.empServ.signIn(empRef.userName,empRef.password).subscribe(data=>{
      
      sessionStorage.setItem('token',data.token);
      this.router.navigateByUrl("employeePanel");
    })
    //this is a quick fix until frontend Employee authentication works \/\/\/
    
  }

}
