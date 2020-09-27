import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  template: `<router-outlet></router-outlet>`
})
export class UsersComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
