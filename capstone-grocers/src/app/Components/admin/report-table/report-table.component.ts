import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/Classes/order';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent implements OnInit {

  @Input() orders:Order[] = [];
  message = "No items to report on"
 tableRowDate:{"id":String |undefined,"quantity":number,"price":number,"name":String}[] =[];
  constructor() { }

  ngOnInit(): void {
  }

  /*
  buildTable()
  {
    console.log("here");
    this.tableRowDate = [];
    this.orders.forEach(order=>{
      order.cart.forEach(cart=>{
        let temp = cart.product._id;
       let wasFound = false;
       for(let x = 0; x < this.tableRowDate.length; x++)
       {
        if(this.tableRowDate[x].id == temp)
        {
          this.tableRowDate[x].price = cart.product.price;
          this.tableRowDate[x].quantity = this.tableRowDate[x].quantity + cart.quantity;
          wasFound = true;
          break;
        }
        
       }
       if(!wasFound)
       this.tableRowDate.push({"id":cart.product._id,"quantity":cart.quantity,"price":cart.product.price,"name":cart.product.name})
      })



    })
    console.log(this.tableRowDate);
  }*/

  // get the user for this order to list in table
  parentBuildTable(parentOrders:Order[])
  {
   
    this.tableRowDate = [];
    parentOrders.forEach(order=>{
      order.cart.forEach(cart=>{
        let temp = cart.product._id;
       let wasFound = false;
       for(let x = 0; x < this.tableRowDate.length; x++)
       {
        if(this.tableRowDate[x].id == temp)
        {
          this.tableRowDate[x].price = cart.product.price;
          this.tableRowDate[x].quantity = this.tableRowDate[x].quantity + cart.quantity;
          wasFound = true;
          break;
        }
        
       }
       if(!wasFound)
       this.tableRowDate.push({"id":cart.product._id,"quantity":cart.quantity,"price":cart.product.price,"name":cart.product.name})
      })



    })
    if(this.tableRowDate.length == 0)
    {
      this.message = 'No items to report on';
    }
    else
    {
      this.message = '';
    }
    
  }

}
