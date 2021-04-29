
import { UserService } from 'src/app/Services/user.service';
import { TicketService } from './../../../Services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/Classes/ticket';
import { Router } from '@angular/router';




@Component({
  selector: 'app-unlock-users',
  templateUrl: './unlock-users.component.html',
  styleUrls: ['./unlock-users.component.css']
})
export class UnlockUsersComponent implements OnInit {




  userMsg?:String
details?:Array<Ticket>
  constructor(public detailSer:TicketService,public userSer:UserService, private router:Router) { }


  ngOnInit(): void {
  //  this.detailSer.getDetailOfUser().subscribe(result=>{this.details=result; console.log(result)})
  this.detailSer.getLockedOutUsers().subscribe(tickets=>{
    console.log(tickets);
    this.details = tickets;
  })
  }





  unlockUser(userRef:any){
    console.log(userRef)
    this.userSer.unlockLockUser(userRef).subscribe((result:string)=>{})

}
unlock(id?:String,ticketID?:String)
{
  if(ticketID == null)
    ticketID  = ''
  if(id == null)
    id = ''
  this.userSer.unlockLockUser({u_username:id,locked:false,ticket:ticketID}).subscribe(data=>{
    this.router.navigateByUrl('/employeePanel')
  })
}
}
