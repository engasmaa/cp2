import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { NotificationComponent } from './notification.component';
import { NotificationsListComponent } from './notifications/notifications-list.component';
import { NotificationRoutingModule } from './nofications-routing.module';



@NgModule({
  declarations: [
NotificationComponent,
NotificationsListComponent
  
],
  imports: [
    CommonModule,
    NotificationRoutingModule,
   FormsModule,
    SharedModule,



  ]
})
export class NotificationModule { }
