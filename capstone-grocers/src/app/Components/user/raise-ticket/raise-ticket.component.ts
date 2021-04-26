import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/Services/ticket.service';


@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css']
})
export class RaiseTicketComponent implements OnInit {

  constructor(private ticketServ:TicketService,private router:Router) { }

  ngOnInit(): void {
  }

  raiseTicket(userRef:any){
      this.ticketServ.sendTicket(userRef)
      console.log(userRef.data)
      this.router.navigateByUrl('/userPanel');
  }
  

  }

