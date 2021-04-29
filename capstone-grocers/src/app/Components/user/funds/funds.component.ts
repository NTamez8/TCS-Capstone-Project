import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

  me:User = new User('','','','','',0,'')
  

  constructor(public userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe(user=>{
      console.log(user);
      this.me = user;
    })
  }
  loadFunds(fundsRef:any){
 
    this.userService.loadFunds(fundsRef).subscribe((res:any)=>{
      
      this.router.navigateByUrl('/userPanel')
    })
  }
  checkFunds(id:string ,cost:number){
    this.userService.checkFunds(id,cost).subscribe((res:any)=>{
      if(res.approved == true){
        console.log(res)
      }
    })
  }
}
