import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { productRequest } from 'src/app/Classes/request';
import { RequestService } from 'src/app/Services/request.service';


@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  public requests:Array<productRequest> = [];

  constructor(private requestService:RequestService, private router:Router) { }

  ngOnInit(): void {
    this.getAllRequests();
  }

  async getRequestById(requestRef:NgForm){
    await this.requestService.getRequestById(requestRef.value.request_id).subscribe(result=>this.requests=result,error=>console.log(error));
  };

  async getAllRequests(){
    //probably returning an observable for .subscribe
    await this.requestService.getAllRequests().subscribe(result=>this.requests=result,error=>console.log(error));
    //this.requests=[{e_username:"darrixo",product_id:99,new_quantity:23,datetime_requested:"today",status:"in progress"},{e_username:"darrixo2",product_id:99,new_quantity:23,datetime_requested:"today",status:"resolved"}];
    //this.requests=[new Request("emp1",9,5,"10/05/2021","In Progress")];
  };

  async resolveRequest(request:productRequest){
    console.log("Resolving request!");
    await this.requestService.resolveRequest(request._id as string).subscribe(result=>console.log(result.token),error=>console.log(error));
    this.getAllRequests();
    ////request.status="resolved";
    // this.requestService.currentRequest = request;
    // this.requestService.viewRequestURL = this.router.url.split("/")[2];
    // this.router.navigateByUrl("/" + this.router.url.split("/")[1] + "/updateProducts");
  };
}
