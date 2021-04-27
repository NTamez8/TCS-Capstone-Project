import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {
  
  constructor(private userServ:UserService) { }

  ngOnInit(): void {
  }

  deleteProduct(product_name:any){
    this.userServ.deleteProductfromCart(product_name).subscribe((result)=>{
      console.log(result)
    })
  }

}
