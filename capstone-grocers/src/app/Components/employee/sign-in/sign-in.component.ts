import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  login(empRef:any)
  {
    /*
    this.empServ.signIn(empRef.userName,empRef.password).subscribe(data=>{
      console.log(data.token);
      sessionStorage.setItem('token',data.token);
    })*/
    //this is a quick fix until frontend Employee authentication works \/\/\/
    this.router.navigateByUrl("employeePanel");
  }

}
