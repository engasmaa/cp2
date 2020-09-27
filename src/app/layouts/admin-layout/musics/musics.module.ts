import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  ,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { MusicsComponent } from './musics.component';
import { MusicsListComponent } from './musics/musics-list.component';
import { MusicsRoutingModule } from './musics-routing.module';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';





@NgModule({
  declarations: [
MusicsComponent,
MusicsListComponent

  
],
  imports: [
    CommonModule,
    MusicsRoutingModule,
    FormsModule,
    SharedModule,

    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class MusicsModule { }
