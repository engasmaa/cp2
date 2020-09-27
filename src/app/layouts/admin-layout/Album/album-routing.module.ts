import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album.component';
import { AlbumListComponent } from './album/album-list.component';
import { AlbumAddEditComponent } from './album-add-edit/album-add-edit.component';




const routes: Routes = [{
  path: '',
  component: AlbumComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: AlbumListComponent,

        },
        {
          path: 'edit/:id',
          component: AlbumAddEditComponent,

        },
        {
          path: 'add',
          component: AlbumAddEditComponent,
        },
 
     
      ]      
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
