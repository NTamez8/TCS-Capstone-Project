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
  //when the component initializes, grab all of the requests
  ngOnInit(): void {
    this.getAllRequests();
  }

  //get the index of a reqeust
  getRequestIndex(request:productRequest){
    return this.requestService.currentRequests.findIndex((request)=>this.requestService.currentRequest[0]._id == request._id);
  }

  //retrieve request by ID
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

  //retrieve all requests
  async getAllRequests(){
    //probably returning an observable for .subscribe
    this.single = false;
    await this.requestService.getAllRequests().subscribe(result=>this.requestService.currentRequests=result,error=>console.log(error));
  };

  //resolve a request if it exists, if the product ID is valid
  //and if the current product quantity matches the requested
  async resolveRequest(request:productRequest){
    // current-scoped variables
    let productService = this.productService;
    let requestService = this.requestService;
    let curComponent = this;
    //changing scope
    await productService.getAllProducts().subscribe(function(result){
      productService.currentProducts=result;
      //if the product of the request exists, check quantity
      if(productService.productExists(request.product_id)){
        //console.log("Resolving request!");
        //need to compare current product quanitity
        productService.getProductById(request.product_id as string).subscribe(
          function (result){
            productService.currentProducts=result;
            //if product quantity doesn't match notify the client
            if(productService.currentProducts[0].quantity != request.new_quantity){
              alert(`Please change product quantity! Current quantity: ${productService.currentProducts[0].quantity}`);
              //console.log(productService.currentProducts);
            //otherwise we can automatically resolve the request
            }else{
              requestService.resolveRequest(request._id as string).subscribe(result=>console.log(result.token),error=>console.log(error));
              curComponent.getAllRequests();
            }
          },error=>console.log(error));
      //if the product does not exist, notify the user 
      //and delete all requests with nonexistent products
      }else{
        alert("The request must be removed because the product ID no longer exists!\nNow will delete all requests with invalid product ID's.");
        curComponent.deleteRequestsWithNonExistentProducts(curComponent);
      }
    });
  };

  //Remove only resolved requests
  async deleteRequest(request:productRequest){
    //current-scoped variables
    let curComponent = this;
    let productService = this.productService;
    let requestService = this.requestService;
    //changing scope
    await productService.getAllProducts().subscribe(function(result){
      productService.currentProducts=result;
      //if the product of the requests exists, check to see if the request is resolved
      if(productService.productExists(request.product_id)){
        //if it is resolved, delete it
        if(request.status=="resolved"){
          requestService.deleteRequestById(request._id as string).subscribe(data=>console.log(data));
          curComponent.getAllRequests();
        //else notify the user that they can't delete unresolved requests
        }else{
          alert("You cannot remove a request until it is resolved!");
        }
      //if the product does not exist, notify the user 
      //and delete all requests with nonexistent products
      }else{
        alert("The request must be removed because the product ID no longer exists!\nNow will delete all requests with invalid product ID's.");
        curComponent.deleteRequestsWithNonExistentProducts(curComponent);
      };
    });
  };

  deleteRequestsWithNonExistentProducts(curComponent:ViewRequestsComponent){
    this.requestService.currentRequests.forEach(
      function(request){
        if(!curComponent.productService.productExists(request.product_id)){
          curComponent.deleteRequestForce(request);
      }});
  }

  //Force-delte requests (ex: ones that have an invalid product_id)
  async deleteRequestForce(request:productRequest){
    await this.requestService.deleteRequestById(request._id as string).subscribe();
    this.getAllRequests();
  };
}
