import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  private requests = [];

  constructor(private requestService:RequestService) { }

  ngOnInit(): void {

  }

  viewRequests(){
    //probably returning an observable for .subscribe
    
  }
}
