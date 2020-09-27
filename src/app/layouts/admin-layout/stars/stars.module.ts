import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { StarsComponent } from './stars.component';
import { StarsListComponent } from './stars/stars-list.component';
import { StarsRoutingModule } from './stars-routing.module';
import { StarsAddEditComponent } from './stats-add-edit/stars-add-edit.component';

@NgModule({
  declarations: [
    StarsComponent,
    StarsListComponent,
    StarsAddEditComponent
, 
],
  imports: [
    CommonModule,
    StarsRoutingModule,
   FormsModule,
    SharedModule,
  ]
})
export class StarsModule { }
