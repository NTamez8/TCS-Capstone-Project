import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { RequestService } from 'src/app/Services/request.service';
import { ViewProductsComponent } from 'src/app/Components/admin/view-products/view-products.component';


@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  public product_id:any;
  public new_quantity:any;
  public fromViewRequest:any;

  constructor(public viewProductComponent:ViewProductsComponent,private productService:ProductService, private requestService:RequestService, private router:Router) { }

  ngOnInit(): void {
    if(this.requestService.currentRequest[0]){
      this.product_id = this.requestService.currentRequest[0].product_id;
      this.new_quantity = this.requestService.currentRequest[0].new_quantity;
      this.fromViewRequest = true;
    }
    //console.log(this.product_id);
  }

  async updateProduct(){
    //const formValues = productRef.value;
    console.log("Updating Product");
    await this.productService.updateProduct(this.product_id,this.new_quantity).subscribe(data=>console.log(data.token));
    if(this.fromViewRequest){
      if(this.product_id == this.requestService.currentRequest[0].product_id && this.new_quantity == this.requestService.currentRequest[0].new_quantity){
        this.backToViewingRequests();
      }
    }
    this.viewProductComponent.getAllProducts();
  }

  async backToViewingRequests(){
    const request_id = this.requestService.currentRequest[0]._id;
    await this.requestService.resolveRequest(request_id as string).subscribe(
      result=>console.log(result.token),error=>console.log(error));
    this.router.navigateByUrl("adminPanel/viewRequests");
  }
}
