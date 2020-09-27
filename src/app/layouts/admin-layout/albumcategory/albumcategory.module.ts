import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { AlbumcategoryComponent } from './albumcategory.component';
import { AlbumcategoryRoutingModule } from './albumcategory-routing.module';
import { AlbumcategoryListComponent } from './albumcategory/albumcategory-list.component';


@NgModule({
  declarations: [
AlbumcategoryListComponent,
AlbumcategoryComponent
 
],
  imports: [
    CommonModule,
    AlbumcategoryRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class AlbumcategoryModule { }
