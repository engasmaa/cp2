import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { AnnonceComponent } from './annonce.component';
import { AnnonceListComponent } from './annonce/annonce-list.component';
import { AnnonceRoutingModule } from './annonce-routing.module';
import { AnnonceAddEditComponent } from './annonce-add-edit/annonce-add-edit.component';



@NgModule({
  declarations: [
AnnonceComponent,
AnnonceListComponent,
AnnonceAddEditComponent

  
],
  imports: [
    CommonModule,
    AnnonceRoutingModule,
   FormsModule,
    SharedModule,



  ]
})
export class AnnonceModule { }
