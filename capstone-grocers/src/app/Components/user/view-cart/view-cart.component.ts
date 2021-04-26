import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  public products:Array<User> = [];
  constructor(private userServ:UserService) { }

  ngOnInit(): void {
  }

  viewAllProducts(){
    console.log("View products in Cart");
    this.userServ.viewAllProductsinCart().subscribe(result=>this.products=result,error=>console.log(error));
  }

}
