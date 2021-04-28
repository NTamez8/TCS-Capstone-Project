import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { productRequest } from 'src/app/Classes/request';
import { ProductService } from 'src/app/Services/product.service';
import { RequestService } from 'src/app/Services/request.service';


@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  constructor(public requestService:RequestService, public productService:ProductService, private router:Router) { }

  public single:any;
  ngOnInit(): void {
    this.getAllRequests();
  }

  getRequestIndex(request:productRequest){
    return this.requestService.currentRequests.findIndex((request)=>this.requestService.currentRequest[0]._id == request._id);
  }

  async getRequestById(requestRef:NgForm){
    //update Requests before checking for valid ID
    this.getAllRequests();
    let request_order = requestRef.value.request_order;
    let request_id = this.requestService.currentRequests[request_order-1]?._id;
    //check for valid Request ID
    if(this.requestService.requestExists(request_id as String)){
      await this.requestService.getRequestById(request_id).subscribe(result=>this.requestService.currentRequest=result,error=>console.log(error));
      this.single = true;
      //console.log(this.requestService)
    }else{
      alert("Request does not exist. Please use a valid request ID!");
    }
  };

  async getAllRequests(){
    //probably returning an observable for .subscribe
    this.single = false;
    await this.requestService.getAllRequests().subscribe(result=>this.requestService.currentRequests=result,error=>console.log(error));
    //this.requests=[{e_username:"darrixo",product_id:99,new_quantity:23,datetime_requested:"today",status:"in progress"},{e_username:"darrixo2",product_id:99,new_quantity:23,datetime_requested:"today",status:"resolved"}];
    //this.requests=[new Request("emp1",9,5,"10/05/2021","In Progress")];
  };

  async resolveRequest(request:productRequest){
    if(this.productService.productExists(request.product_id)){
      //console.log("Resolving request!");
      let productService = this.productService;
      let requestService = this.requestService;
      let curComponent = this;
      await productService.getProductById(request.product_id as string).subscribe(
        function (result){
          productService.currentProducts=result;
          if(productService.currentProducts[0].quantity != request.new_quantity){
            alert(`Please change product quantity! Current quantity: ${productService.currentProducts[0].quantity}`);
            //console.log(productService.currentProducts);
          //otherwise we can automatically resolve the request
          }else{
            requestService.resolveRequest(request._id as string).subscribe(result=>console.log(result.token),error=>console.log(error));
            curComponent.getAllRequests();
          }
        },error=>console.log(error));
    }else{
      alert("The request must be removed because the product ID no longer exists!\nNow will delete all requests with invalid product ID's.");
      let thisReference = this;
      this.requestService.currentRequests.forEach(
        function(request){
          thisReference.deleteRequestForce(request);
        });
    }
  };

  async deleteRequest(request:productRequest){
    if(request.status=="resolved"){
      await this.requestService.deleteRequestById(request._id as string).subscribe(data=>console.log(data.token));
      this.getAllRequests();
    }else{
      alert("You cannot remove a request until it is resolved!");
    }
  };

  async deleteRequestForce(request:productRequest){
    await this.requestService.deleteRequestById(request._id as string).subscribe(data=>console.log(data.token));
    this.getAllRequests();
  };
}
