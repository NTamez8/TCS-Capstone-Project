import { EmployeeService } from 'src/app/Services/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(public editSer:EmployeeService) { }
  updateMsg?:string;
  ngOnInit(): void {
  }

  updatePassword(passwordRef:any){
    console.log(passwordRef)
    this.editSer.editPassword(passwordRef).subscribe((result:string)=>{
      this.updateMsg=result;
    })

  }

}
