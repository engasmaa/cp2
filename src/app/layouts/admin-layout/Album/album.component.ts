import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  template: `<router-outlet></router-outlet>`
})
export class AlbumComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
