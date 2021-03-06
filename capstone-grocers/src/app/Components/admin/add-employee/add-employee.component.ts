import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Classes/employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  message:String='';
  constructor(private empService:EmployeeService) { }

  ngOnInit(): void {
  }



  formSubmit(empForm:NgForm)
  {
    let newEmpData = empForm.value;
    let fname = newEmpData.firstName;
    let lname = newEmpData.lastName;
    let email = newEmpData.email;
    let emp = new Employee(fname,lname,email);
    
    this.empService.addEmployee(emp).subscribe(data=>
      {
        this.message = 'Employee added'
        empForm.resetForm();
        setTimeout(() => {
          this.message = '';
        }, 1000);
      },
      err=>{
        this.message = 'Error'
        empForm.resetForm();
        setTimeout(() => {
          this.message = '';
        }, 1000);
      }
      );
  }
 

}
