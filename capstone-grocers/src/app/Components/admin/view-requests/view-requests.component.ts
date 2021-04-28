import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { productRequest } from 'src/app/Classes/request';
import { ProductService } from 'src/app/Services/product.service';
import { RequestService } from 'src/app/Services/request.service';
import { ViewProductsComponent } from 'src/app/Components/admin/view-products/view-products.component';


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
    await this.getAllRequests();
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
  };

  async resolveRequest(request:productRequest){
    let productService = this.productService;
    let requestService = this.requestService;
    let curComponent = this;
    await productService.getAllProducts().subscribe(function(result){
      productService.currentProducts=result;
      if(productService.productExists(request.product_id)){
        //console.log("Resolving request!");
        productService.getProductById(request.product_id as string).subscribe(
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
        requestService.currentRequests.forEach(
          function(request){
            if(!productService.productExists(request.product_id)){
              curComponent.deleteRequestForce(request);
          }});
      }
    });
  };

  //Remove only resolved requests
  async deleteRequest(request:productRequest){
    let curComponent = this;
    let productService = this.productService;
    let requestService = this.requestService;
    await productService.getAllProducts().subscribe(function(result){
      productService.currentProducts=result;
      if(productService.productExists(request.product_id)){
        if(request.status=="resolved"){
          requestService.deleteRequestById(request._id as string).subscribe(data=>console.log(data.token));
          curComponent.getAllRequests();
        }else{
          alert("You cannot remove a request until it is resolved!");
        }
      }else{
        alert("The request must be removed because the product ID no longer exists!\nNow will delete all requests with invalid product ID's.");
        requestService.currentRequests.forEach(
          function(request){
            if(!curComponent.productService.productExists(request.product_id)){
              curComponent.deleteRequestForce(request);
          }});
      };
    });
  };

  //Force-delte requests (ones that have an invalid product_id)
  async deleteRequestForce(request:productRequest){
    await this.requestService.deleteRequestById(request._id as string).subscribe(data=>console.log(data.token));
    this.getAllRequests();
  };
}
