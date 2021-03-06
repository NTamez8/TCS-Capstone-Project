import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Order } from 'src/app/Classes/order';
import { Product } from 'src/app/Classes/product';
import { User } from 'src/app/Classes/user';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';
import { ReportTableComponent } from '../report-table/report-table.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @ViewChild(ReportTableComponent) reportTable?:ReportTableComponent;
  reportType: string = '1';
  date: string = '';
  products: Product[] = [];
  customers: User[] = [];
  orders:Order[] = [];
  constructor(private oService:OrderService,private userServ:UserService,private productServ:ProductService) {}

  ngOnInit(): void {
    this.productServ.getAllProducts().subscribe(data=>{this.products = data});
    this.userServ.getAllUsers().subscribe(data=>{this.customers = data})

  }

  changedValue(selector: any) {

    this.reportType = selector;
  }

  buildReport() {
    //console.log(this.date);
    switch (this.reportType) {
      case "1":
        this.oService.getOrdersByDay(this.date).subscribe(data=>this.orders = data);
        break;
      case "2":
        this.oService.getOrdersByWeek(this.date).subscribe(data=>this.orders = data);
        break;
      case "3":
        this.oService.getOrdersByMonth(this.date).subscribe(data=>this.orders = data);
        break;
      case "4":
        this.oService.getOrdersByProd('').subscribe(data=>this.orders = data);
        break;
      case "5":
        this.oService.getOrdersByCust('').subscribe(data=>this.orders = data);
        break;
      default:
        console.log("some error");
    }
  }

  changeDate(newDate: any) {
    
    if (this.reportType == '1') {
      this.date = newDate;
      this.oService.getOrdersByDay(this.date).subscribe(data=>{this.orders = data
      this.reportTable?.parentBuildTable(data);
      });
    } else if (this.reportType == '2') {
      this.date = this.getDateFromWeek(newDate);
      this.oService.getOrdersByWeek(this.date).subscribe(data=>{this.orders = data
      this.reportTable?.parentBuildTable(data);
      });
    } else if (this.reportType == '3') {
      this.date = this.getDateFromMonth(newDate);
      this.oService.getOrdersByMonth(this.date).subscribe(data=>{this.orders = data
      this.reportTable?.parentBuildTable(data);
      });
    }
   
  }

  changeCust(newCust: any) {
    
    
    this.oService.getOrdersByCust(newCust).subscribe(data=>{this.orders = data
    this.reportTable?.parentBuildTable(data);
    }
      
      );
  }

  changeProd(newProd: any) {
   
    this.oService.getOrdersByProd(newProd).subscribe(data=>{this.orders = data
    this.reportTable?.parentBuildTable(data);
    }
      
      );
  }

  getDateFromWeek(weekDate: string) {
    let letYearAndWeek = weekDate.split('W');

    let daysOfYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let count = 0;
    let numWeek = eval(letYearAndWeek[1]);
    let numDays = numWeek * 7;
    while (numDays >= 32) {
      numDays -= daysOfYear[count];
      count++;


    }
    numDays -= 4;
    let newDate = new Date(eval(letYearAndWeek[0].slice(0, 4)), count, numDays);

    let splitDate = newDate.toLocaleDateString('en-US').split('/');
    splitDate[0] = splitDate[0].length == 2 ? splitDate[0] : '0' + splitDate[0];
    splitDate[1] = splitDate[1].length == 2 ? splitDate[1] : '0' + splitDate[1];
    return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;

  }
  getDateFromMonth(monthDate: string) {
    let YearAndMonth = monthDate.split('-');

    let year = YearAndMonth[0];
    let month = YearAndMonth[1];
    return `${year}-${month}-01`;
    /*
        let newDate = new Date(year,month,1);
        console.log(newDate.toLocaleDateString('en-US'));
        let splitDate = newDate.toLocaleDateString('en-US').split('/');
        splitDate[0] = splitDate[0].length == 2? splitDate[0] : '0' + splitDate[0];
        splitDate[1] = splitDate[1].length == 2? splitDate[1] : '0' + splitDate[1];
        return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;// year month day
        return newDate.toLocaleDateString('en-US').replace('/','-').replace('/','-');*/
  }

}
