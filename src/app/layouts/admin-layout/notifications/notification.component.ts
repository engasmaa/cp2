import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  template: `<router-outlet></router-outlet>`
})
export class NotificationComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
