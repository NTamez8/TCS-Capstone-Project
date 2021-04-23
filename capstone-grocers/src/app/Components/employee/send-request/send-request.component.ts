import { RequestService } from './../../../Services/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css']
})
export class SendRequestComponent implements OnInit {

  constructor(public productSer:RequestService) { }

  ngOnInit(): void {
  }
  addProductQuntity(productRef:any){
    console.log(productRef);
    this.productSer.sendRequest(productRef)
      }
  

  

}
