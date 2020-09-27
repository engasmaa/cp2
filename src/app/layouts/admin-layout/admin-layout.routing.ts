import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';

const AdminLayoutRoutes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
  
      {
        path: 'users',
        loadChildren: () => import('../admin-layout/user/users.module').then(m => m.UsersModule),
      },
     
      {
        path: 'stars',
        loadChildren: () => import('../admin-layout/stars/stars.module').then(m => m.StarsModule),
      }, 
       {
        path: 'settings',
        loadChildren: () => import('../admin-layout/settings/settings.module').then(m => m.SettingsModule),
      }, 
       {
        path: 'notification',
        loadChildren: () => import('../admin-layout/notifications/notification.module').then(m => m.NotificationModule),
      }, 
       {
        path: 'musics',
        loadChildren: () => import('../admin-layout/musics/musics.module').then(m => m.MusicsModule),
      },  
      {
        path: 'language',
        loadChildren: () => import('../admin-layout/language/language.module').then(m => m.LanguageModule),
      }, 
       {
        path: 'annonce',
        loadChildren: () => import('../admin-layout/annonce/annonce.module').then(m => m.AnnonceModule),
      },
      
      {
        path: 'album',
        loadChildren: () => import('../admin-layout/Album/album.module').then(m => m.AlbumModule),
      },
      {
        path: 'home',
        loadChildren: () => import('../admin-layout/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'albumcategory',
        loadChildren: () => import('../admin-layout/albumcategory/albumcategory.module').then(m => m.AlbumcategoryModule),
      },

      // {
      //   path: 'song-request',
      //   loadChildren: () => import('../admin-layout/').then(m => m.AlbumcategoryModule),
      // },
  
    ]
   
  }];
  
  @NgModule({ 
    imports: [RouterModule.forChild(AdminLayoutRoutes)],
    exports: [RouterModule]
  })
  export class AdminLayoutRoutesModule { }
