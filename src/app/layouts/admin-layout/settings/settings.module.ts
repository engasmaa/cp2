import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsListComponent } from './settings/settings-list.component';
import { SettingsRoutingModule } from './settings-routing.module';


@NgModule({
declarations: [
SettingsComponent,
SettingsListComponent

  
],
  imports: [
    CommonModule,
    SettingsRoutingModule,
   FormsModule,
    SharedModule,



  ]
})
export class SettingsModule { }
