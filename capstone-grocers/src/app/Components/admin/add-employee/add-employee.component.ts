import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Classes/employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private empService:EmployeeService) { }

  ngOnInit(): void {
  }



  formSubmit(newEmpData:any)
  {
    console.log(newEmpData);
    let fname = newEmpData.firstName;
    let lname = newEmpData.lastName;
    let email = newEmpData.email;
    let emp = new Employee(fname,lname,email);
    
    this.empService.addEmployee(emp).subscribe(data=>console.log(data));
  }

}
