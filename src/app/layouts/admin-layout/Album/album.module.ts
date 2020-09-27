import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { AlbumListComponent } from './album/album-list.component';
import { AlbumAddEditComponent } from './album-add-edit/album-add-edit.component';
import { SearchPipe } from './album/Search.pipe'

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
AlbumComponent,
AlbumListComponent,
AlbumAddEditComponent,
SearchPipe
],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  // exports: [MatAutocompleteModule, MatFormFieldModule,MatInputModule],

})

export class AlbumModule { }
