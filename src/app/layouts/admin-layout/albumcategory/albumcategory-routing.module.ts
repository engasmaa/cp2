import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumcategoryComponent } from './albumcategory.component';
import { AlbumcategoryListComponent } from './albumcategory/albumcategory-list.component';


const routes: Routes = [{
  path: '',
  component: AlbumcategoryComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: AlbumcategoryListComponent,
        },
      ]     
    
 
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumcategoryRoutingModule { }
