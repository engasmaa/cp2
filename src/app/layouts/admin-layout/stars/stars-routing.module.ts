import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarsComponent } from './stars.component';
import { StarsListComponent } from './stars/stars-list.component';
import { StarsAddEditComponent } from './stats-add-edit/stars-add-edit.component';




const routes: Routes = [{
  path: '',
  component: StarsComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: StarsListComponent

        },

        {
          path: 'edit/:id',
          component: StarsAddEditComponent,

        },
        {
          path: 'add',
          component: StarsAddEditComponent,

        },
 
     
      ]     
    
 
  
}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarsRoutingModule { }
