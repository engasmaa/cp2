import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  AdminLayoutRoutesModule } from './admin-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { AdminLayoutComponent } from './admin-layout.component';
import { SharedModule } from 'app/shared/shared.module';
import { ComponentsModule } from 'app/components/components.module';
import { SongRequestComponent } from './song-request/song-request.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminLayoutRoutesModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [
    AdminLayoutComponent,
    SongRequestComponent,
  ]
})

export class AdminLayoutModule {}
