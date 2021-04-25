import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userServ:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  login(userRef:any)
  {
    this.userServ.signIn(userRef.userName,userRef.password).subscribe(data=>{
      console.log(data.token);
      sessionStorage.setItem('token',data.token);
      this.router.navigateByUrl('/userPanel');
    })
  }

}
