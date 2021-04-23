import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportType:string = '1';
  date:string = '';
  product:string = '';
  customer:string = '';
  constructor() { }

  ngOnInit(): void {
  }

  changedValue(selector:any)
  {
    
    this.reportType = selector;
  }

  buildReport()
  {
    //console.log(this.date);
  }

  changeDate(newDate:any)
  {
   // console.log(newDate);
   // console.log(this.getDateFromWeek(newDate));
   if(this.reportType == '1')
   {
    this.date = newDate;
   }
   else if(this.reportType == '2')
   {
    this.date = this.getDateFromWeek(newDate);
   }
   else if(this.reportType == '3')
   {
    this.date = this.getDateFromMonth(newDate);
   }
   console.log(this.date);
  }

  changeCust(newCust:any)
  {
    console.log(newCust);
  }

  changeProd(newProd:any)
  {
    console.log(newProd);
  }

  getDateFromWeek(weekDate:string)
  {
   let letYearAndWeek = weekDate.split('W');
   
   let daysOfYear = [31,28,31,30,31,30,31,31,30,31,30,31];
   let count = 0;
   let numWeek = eval(letYearAndWeek[1]);
   let numDays = numWeek * 7;
   while(numDays >= 32)
   {
      numDays -= daysOfYear[count];
      count++;

     
   }
   numDays-= 4;
   let newDate = new Date(eval(letYearAndWeek[0].slice(0,4)),count,numDays);
  
   let splitDate = newDate.toLocaleDateString('en-US').split('/');
   splitDate[0] = splitDate[0].length == 2? splitDate[0] : '0' + splitDate[0];
    splitDate[1] = splitDate[1].length == 2? splitDate[1] : '0' + splitDate[1];
   return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
  
  }
  getDateFromMonth(monthDate:string)
  {
    let YearAndMonth = monthDate.split('-');
    
    let year = YearAndMonth[0];
    let month = YearAndMonth[1];
    return `${year}-${month}-01`;/*
    let newDate = new Date(year,month,1);
    console.log(newDate.toLocaleDateString('en-US'));
    let splitDate = newDate.toLocaleDateString('en-US').split('/');
    splitDate[0] = splitDate[0].length == 2? splitDate[0] : '0' + splitDate[0];
    splitDate[1] = splitDate[1].length == 2? splitDate[1] : '0' + splitDate[1];
    return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;// year month day
    return newDate.toLocaleDateString('en-US').replace('/','-').replace('/','-');*/
  }

}
