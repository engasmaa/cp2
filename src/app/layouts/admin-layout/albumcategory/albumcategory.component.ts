import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albumcategory',
  template: `<router-outlet></router-outlet>`
})
export class AlbumcategoryComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
}
