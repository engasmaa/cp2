import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './user-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
UsersComponent,
UsersListComponent


  
],
  imports: [
    CommonModule,
    UsersRoutingModule,
   FormsModule,
    SharedModule,



  ]
})
export class UsersModule { }
