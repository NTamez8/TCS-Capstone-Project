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

  // error message popup variables
  public resolveError:Boolean = false;
  public deleteAllPopup:Boolean = false;
  public removeError:Boolean = false;
  public invalidRequest:Boolean = false;

  // to determine if we are viewing a single Request or all of them
  public single:any;
  // when the component initializes, grab all of the Requests
  ngOnInit(): void {
    this.getAllRequests();
  }

  // get the index of a Request
  getRequestIndex(request:productRequest){
    return this.requestService.currentRequests.findIndex((request)=>this.requestService.currentRequest[0]._id == request._id);
  }

  // retrieve Request by ID
  async getRequestById(requestRef:NgForm){
    // update Requests before checking for valid ID
    await this.getAllRequests();
    let request_order = requestRef.value.request_order;
    let request_id = this.requestService.currentRequests[request_order-1]?._id;
    // check for valid Request ID
    if(this.requestService.requestExists(request_id as String)){
      this.invalidRequest = false;
      await this.requestService.getRequestById(request_id).subscribe(result=>this.requestService.currentRequest=result,error=>console.log(error));
      this.single = true;
    }else{
      this.invalidRequest = true;
    }
  };

  // retrieve all Requests
  async getAllRequests(){
    this.invalidRequest = false;
    this.resolveError = false;
    this.removeError = false;
    this.single = false;
    await this.requestService.getAllRequests().subscribe(result=>this.requestService.currentRequests=result,error=>console.log(error));
  };

  // resolve a Request if it exists, if the Product ID is valid
  // and if the current Product quantity matches the requested
  async resolveRequest(request:productRequest){
    // current-scoped variables
    let productService = this.productService;
    let requestService = this.requestService;
    let curComponent = this;
    // changing scope
    await productService.getAllProducts().subscribe(function(result){
      productService.currentProducts=result;
      // if the Product of the Request exists, check quantity
      if(productService.productExists(request.product_id)){
        curComponent.invalidRequest = false;
        curComponent.deleteAllPopup = false;
        // need to compare current Product quanitity
        productService.getProductById(request.product_id as string).subscribe(
          function (result){
            productService.currentProducts=result;
            // if Product quantity doesn't match notify the client
            if(productService.currentProducts[0].quantity != request.new_quantity){
              curComponent.resolveError = true;
            // otherwise we can automatically resolve the Request
            }else{
              curComponent.resolveError = false;
              requestService.resolveRequest(request._id as string).subscribe(result=>console.log(result.token),error=>console.log(error));
              curComponent.getAllRequests();
            }
          },error=>console.log(error));
      // if the Product does not exist, notify the user 
      // and delete all Requests with nonexistent Products
      }else{
        curComponent.deleteAllPopup = true;
        curComponent.deleteRequestsWithNonExistentProducts(curComponent);
      }
    });
  };

  // remove only resolved Requests
  async deleteRequest(request:productRequest){
    // current-scoped variables
    let curComponent = this;
    let productService = this.productService;
    let requestService = this.requestService;
    // changing scope
    await productService.getAllProducts().subscribe(function(result){
      productService.currentProducts=result;
      //if the Product of the Request exists, check to see if the Request is resolved
      if(productService.productExists(request.product_id)){
        curComponent.deleteAllPopup = false;
        // if it is resolved, delete it
        if(request.status=="resolved"){
          curComponent.resolveError = false;
          requestService.deleteRequestById(request._id as string).subscribe();
          curComponent.getAllRequests();
        // else notify the admin that they can't delete unresolved Requests
        }else{
          curComponent.removeError = true;
        }
      // if the Product does not exist, notify the admin 
      // and delete all Requests with nonexistent Products
      }else{
        curComponent.deleteAllPopup = true;
        curComponent.deleteRequestsWithNonExistentProducts(curComponent);
      };
    });
  };

  // delete Requests with nonexistent Products
  deleteRequestsWithNonExistentProducts(curComponent:ViewRequestsComponent){
    this.requestService.currentRequests.forEach(
      function(request){
        //if the Product does not exist, delete the Request
        if(!curComponent.productService.productExists(request.product_id)){
          curComponent.deleteRequestForce(request);
      }});
  }

  //Force-delte Requests (ex: ones that have an invalid product_id)
  async deleteRequestForce(request:productRequest){
    await this.requestService.deleteRequestById(request._id as string).subscribe();
    this.getAllRequests();
  };
}
