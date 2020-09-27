import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-musics',
  template: `<router-outlet></router-outlet>`
})
export class MusicsComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
