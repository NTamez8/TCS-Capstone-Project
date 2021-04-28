import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Classes/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  public signIn(email:string,pass:string)
  {
    return this.http.post<{token:string}>('http://localhost:8080/employee/signIn',{email,pass});
  }

  validate(token:string):Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {

      // try changing the response type to text and seeing how that effects the response
      this.http.get('http://localhost:8080/admin/isValid', {
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
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
   return this.http.get<Employee[]>('http://localhost:8080/employee/getAll',{headers:{"Authorization":token}});
  }

  public addEmployee(newEmp:Employee)
  {
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
   return this.http.post('http://localhost:8080/employee/add',newEmp,{headers:{"Authorization":token}});
  }
  public deleteEmployee(idToDelete:String)
  {
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
   return this.http.delete('http://localhost:8080/employee/delete/'+idToDelete,{headers:{"Authorization":token}});
  }
  // public editPassword(productRef:any):any{
  //   return this.http.delete("http://localhost:8080/employee/editPassword",productRef,{responseType:'text'});


  // }
  // editPassword(passwordRef:any):any{
  //   return this.http.put("http://localhost:8080/employee/editPassword",passwordRef,{responseType:'text'})
  // }
  //  public editPassword(passwordRef:any){
  //   let token = 'bearer ' + sessionStorage.getItem('employeeToken');
  //     return this.http.put("http://localhost:8080/employee/editPassword/"+passwordRef,{headers:{"Authorization":token}})
  //   }
  editPassword(passwordRef:any):any{
    let token = 'bearer ' + sessionStorage.getItem('token');
    return this.http.put("http://localhost:8080/employee/editPassword",passwordRef,{headers:{"Authorization":token} ,responseType:'text'} )
  }
}
