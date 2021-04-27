import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  public product_id:any;
  public new_quantity:any;
  public fromViewRequest:any;

  constructor(private productService:ProductService, private requestService:RequestService, private router:Router) { }

  ngOnInit(): void {
    if(this.requestService.currentRequest){
      this.product_id = this.requestService.currentRequest.product_id;
      this.new_quantity = this.requestService.currentRequest.new_quantity;
      this.fromViewRequest = true;
    }
    //console.log(this.product_id);
  }

  updateProduct(){
    //const formValues = productRef.value;
    console.log("Updating Product");
    this.productService.updateProduct(this.product_id,this.new_quantity).subscribe(data=>console.log(data.token));
    if(this.fromViewRequest){
      if(this.product_id == this.requestService.currentRequest.product_id && this.new_quantity == this.requestService.currentRequest.new_quantity){
        this.backToViewingRequests();
      }
    }
  }

  async backToViewingRequests(){
    const request_id = this.requestService.currentRequest._id;
    await this.requestService.resolveRequest(request_id).subscribe(
      result=>console.log(result.token),error=>console.log(error));
    this.router.navigateByUrl("adminPanel/viewRequests");
  }
}
