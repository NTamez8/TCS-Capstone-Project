import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Classes/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  public getAllEmployees():Observable<Employee[]>
  {
   return this.http.get<Employee[]>('http://localhost:8080/employee/getAll');
  }

  public addEmployee(newEmp:Employee)
  {
   return this.http.post('http://localhost:8080/employee/add',newEmp);
  }
  public deleteEmployee(idToDelete:String)
  {
   return this.http.delete('http://localhost:8080/employee/delete/'+idToDelete);
  }
}