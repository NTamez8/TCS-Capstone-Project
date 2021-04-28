import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/Services/ticket.service';


@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css']
})
export class RaiseTicketComponent implements OnInit {
  msg: any;

  constructor(private ticketServ:TicketService,private router:Router) { }

  ngOnInit(): void {
  }
  
  raiseTicket(userIDRef:any){
      this.ticketServ.raiseTicket(userIDRef)
      console.log(userIDRef.data)
      this.msg = "Ticket raised succesfully!"
      this.router.navigate(['user'])
  
  }
  

  }

