import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  // delete the adminToken and go back to the homepage
  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

}
