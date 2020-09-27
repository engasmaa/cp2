import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnonceComponent } from './annonce.component';
import { AnnonceListComponent } from './annonce/annonce-list.component';
import { AnnonceAddEditComponent } from './annonce-add-edit/annonce-add-edit.component';




const routes: Routes = [{
  path: '',
  component: AnnonceComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path: 'list',
      component: AnnonceListComponent,

    },

    {
      path: 'edit/:id',
      component: AnnonceAddEditComponent,

    },
    {
      path: 'add',
      component: AnnonceAddEditComponent,

    },


  ]



}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnonceRoutingModule { }
