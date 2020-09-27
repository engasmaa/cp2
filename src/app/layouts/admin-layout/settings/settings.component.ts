import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  template: `<router-outlet></router-outlet>`
})
export class SettingsComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
