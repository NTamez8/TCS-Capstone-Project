import { User } from 'src/app/Classes/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class updateProfileComponent implements OnInit {

  constructor(public updateSer:UserService) { }
  updateMsg?:string;
  ngOnInit(): void {
  }
  updateProfile(updateProfileRef:any){
    console.log(updateProfileRef)
    this.updateSer.updateProfile(updateProfileRef).subscribe((result:string)=>{
      this.updateMsg=result;
    })
  }
  updatePassword(passwordRef:any){
    console.log(passwordRef)
    this.updateSer.updatePassword(passwordRef).subscribe((result:string)=>{
      this.updateMsg=result;
    })

  }

}