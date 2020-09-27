import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<router-outlet></router-outlet>`
})
export class HomeComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
