import { Component, OnInit } from '@angular/core';
import { Request } from '../../../Classes/request';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  public requests:Array<Request> = [];

  constructor(private requestService:RequestService) { }

  ngOnInit(): void {

  }

  getAllRequests(){
    //probably returning an observable for .subscribe
    this.requestService.getAllRequests().subscribe(result=>this.requests=result,error=>console.log(error));
    this.requests.push(new Request("emp1",9,5,"10/05/2021","In Progress"));
  }
}
