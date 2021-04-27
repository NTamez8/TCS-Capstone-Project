import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { productRequest } from 'src/app/Classes/request';
import { RequestService } from 'src/app/Services/request.service';


@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  public requests:Array<productRequest> = [];

  constructor(private requestService:RequestService) { }

  ngOnInit(): void {
    this.getAllRequests();
  }

  getAllRequests(){
    //probably returning an observable for .subscribe
    //this.requestService.getAllRequests().subscribe(result=>this.requests=result,error=>console.log(error));
    this.requests=[{e_username:"darrixo",product_id:99,new_quantity:23,datetime_requested:"today",status:"in progress"},{e_username:"darrixo2",product_id:99,new_quantity:23,datetime_requested:"today",status:"resolved"}];
    //this.requests=[new Request("emp1",9,5,"10/05/2021","In Progress")];
  };

  resolveRequest(request:productRequest){
    console.log("Resolving request!");
    //await this.requestService.resolveRequest(request._id as string).subscribe(
    //  result=>console.log(result.token),error=>console.log(error));
    request.status="resolved";
  };
}
