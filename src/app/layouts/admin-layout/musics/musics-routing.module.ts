import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicsListComponent } from './musics/musics-list.component';
import { MusicsComponent } from './musics.component';




const routes: Routes = [{
  path: '',
  component: MusicsComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: MusicsListComponent,

        },
 
     
      ]     
    
 
  
}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicsRoutingModule { }
