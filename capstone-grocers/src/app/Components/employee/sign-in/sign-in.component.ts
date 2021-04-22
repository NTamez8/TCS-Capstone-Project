import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private empServ:EmployeeService) { }

  ngOnInit(): void {
  }

  login(empRef:any)
  {
    this.empServ.signIn(empRef.userName,empRef.password).subscribe(data=>{
      console.log(data.token);
      sessionStorage.setItem('token',data.token);
    })
  }

}
