import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  currentAdmin:any;
  constructor() { }

  // grab the Admin currently signed in
  ngOnInit(): void {
    this.currentAdmin = sessionStorage.getItem('adminUser');
  }
}
