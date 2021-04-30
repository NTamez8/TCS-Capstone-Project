import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Classes/product';
import { ProductService } from 'src/app/Services/product.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css']
})
export class SendRequestComponent implements OnInit {


  products:Product[] = [];
 
  constructor(public productSer:RequestService,private prodServ:ProductService) { 
    prodServ.getAllProducts().subscribe(data=>{this.products = data})
  }
  ngOnInit(): void {
  }
  addProductQuntity(productRef:any){
   
    this.productSer.sendRequest(productRef).subscribe(data=>{console.log(data)})
    
      }
  
     
  

}
