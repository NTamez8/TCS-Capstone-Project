import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  currentAdmin:any;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.currentAdmin);
    this.currentAdmin = sessionStorage.getItem('adminUser');
  }
}
