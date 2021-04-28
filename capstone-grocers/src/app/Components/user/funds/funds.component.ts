import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }
  loadFunds(fundsRef:any){
    this.userService.loadFunds(fundsRef.value).subscribe((res:any)=>{
      console.log(res);
      if(res.approved==true){
        console.log(fundsRef)
      }
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
