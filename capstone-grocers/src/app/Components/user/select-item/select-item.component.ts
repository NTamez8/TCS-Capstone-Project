import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent implements OnInit {
  
  constructor(private userServ:UserService) { }

  ngOnInit(): void {
  }
  addProduct(productRef:any){
    console.log(productRef)
    this.userServ.addProductDetailsInfo(productRef)
  }

  deleteProduct(productRef:any){
    
  }
}
