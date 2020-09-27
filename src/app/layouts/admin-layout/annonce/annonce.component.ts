import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonce',
  template: `<router-outlet></router-outlet>`
})
export class AnnonceComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
