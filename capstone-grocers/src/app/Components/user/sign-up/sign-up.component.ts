import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userServ:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  signUp(userInfo:any)
  {
    
    let fName = userInfo.fname;
    let lName  = userInfo.lname;
    let email = userInfo.email;
    let password = userInfo.pass;
    let dob = userInfo.DoB;
    let phone = userInfo.phone;
    let addr = userInfo.addr;
    let user = new User(fName,lName,email,password,addr,phone,dob);
    this.userServ.signUp(user).subscribe(data=>{ 
      
      sessionStorage.setItem('token',data.token);
      this.router.navigateByUrl('/userPanel');
    });
  }
}
