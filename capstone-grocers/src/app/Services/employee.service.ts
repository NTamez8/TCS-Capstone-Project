import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Classes/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  
  signIn(email_address:String,e_password:String){
    return this.http.post<{token:string}>('http://localhost:8080/employee/signIn',{email_address,e_password});
  };
  validate(token:string):Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {

      // try changing the response type to text and seeing how that effects the response
      this.http.get('http://localhost:8080/employee/isValid', {
        headers: {
          "Authorization": token
        },
        responseType:'text'
      }).subscribe((data)=>{
        resolve(true);
      },error=>{
        reject(error);
      });

    });
  };

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
