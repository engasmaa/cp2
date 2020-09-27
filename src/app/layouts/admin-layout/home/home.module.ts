import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { HomeComponent } from './home.component';
import { HomeAddEditComponent } from './home-add-edit/home-add-edit.component';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
HomeComponent,
HomeAddEditComponent,
HomeListComponent

  
],
  imports: [
    CommonModule,
    HomeRoutingModule,
   FormsModule,
    SharedModule,
  


  ]
})
export class HomeModule { }
