import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logOut()
  {
    sessionStorage.clear();
  }

}
