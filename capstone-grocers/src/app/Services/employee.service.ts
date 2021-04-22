import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Classes/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }


  public AddEmployee(newEmp:Employee)
  {
   return this.http.post('http://localhost:8080/employee/add',newEmp);
  }
}
