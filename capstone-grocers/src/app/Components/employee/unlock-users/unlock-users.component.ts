
import { UserService } from 'src/app/Services/user.service';
import { TicketService } from './../../../Services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/Classes/ticket';




@Component({
  selector: 'app-unlock-users',
  templateUrl: './unlock-users.component.html',
  styleUrls: ['./unlock-users.component.css']
})
export class UnlockUsersComponent implements OnInit {




  userMsg?:String
details?:Array<Ticket>
  constructor(public detailSer:TicketService,public userSer:UserService) { }


  ngOnInit(): void {
    this.detailSer.getDetailOfUser().subscribe(result=>{this.details=result; console.log(result)})
  }





  unlockUser(userRef:any){
    console.log(userRef)
    this.userSer.updatestatusToUser(userRef).subscribe((result:string)=>{})

}
}
