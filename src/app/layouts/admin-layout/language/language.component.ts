import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language',
  template: `<router-outlet></router-outlet>`
})
export class LanguageComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
