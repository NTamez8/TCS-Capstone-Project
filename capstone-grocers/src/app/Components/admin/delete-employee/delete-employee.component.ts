import {
  Component,
  OnInit
} from '@angular/core';
import {
  Employee
} from 'src/app/Classes/employee';
import {
  EmployeeService
} from 'src/app/Services/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.empService.getAllEmployees().subscribe(data => this.employees = data);
  }

  submitDelete(empIdToDelete: any) {
    if (empIdToDelete._id != '') {
      this.empService.deleteEmployee(empIdToDelete._id).subscribe(data => {
        
        this.empService.getAllEmployees().subscribe(data => this.employees = data);
      });
    }
  }

}
