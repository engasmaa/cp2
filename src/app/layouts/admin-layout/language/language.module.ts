import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { LanguageComponent } from './language.component';
import { LanguageListComponent } from './language/language-list.component';
import { LanguageRoutingModule } from './language-routing.module';



@NgModule({
  declarations: [
LanguageComponent,
LanguageListComponent


  
],
  imports: [
    CommonModule,
    LanguageRoutingModule,
   FormsModule,
    SharedModule,
  


  ]
})
export class LanguageModule { }
