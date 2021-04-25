<<<<<<< HEAD
<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { UserService } from 'src/app/Services/user.service';
import { TicketService } from './../../../Services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/Classes/ticket';
>>>>>>> pruthvi
=======
import { UserService } from 'src/app/Services/user.service';
import { TicketService } from './../../../Services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/Classes/ticket';
>>>>>>> sruthti

@Component({
  selector: 'app-unlock-users',
  templateUrl: './unlock-users.component.html',
  styleUrls: ['./unlock-users.component.css']
})
export class UnlockUsersComponent implements OnInit {
<<<<<<< HEAD
<<<<<<< HEAD

  constructor() { }

=======
details?:Array<Ticket>
  constructor(public detailSer:TicketService,public userSer:UserService) { }
userMsg?:String
>>>>>>> sruthti
  ngOnInit(): void {
    this.detailSer.getDetailOfUser().subscribe(result=>this.details=result)
  }

<<<<<<< HEAD
=======
details?:Array<Ticket>
  constructor(public detailSer:TicketService,public userSer:UserService) { }
userMsg?:String
  ngOnInit(): void {
    this.detailSer.getDetailOfUser().subscribe(result=>this.details=result)
  }

=======
>>>>>>> sruthti
  unlockUser(userRef:any){
    console.log(userRef)
    this.userSer.updatestatusToUser(userRef).subscribe((result:string)=>{

     this.userMsg=result;
  })

}
<<<<<<< HEAD
>>>>>>> pruthvi
=======
>>>>>>> sruthti
}
