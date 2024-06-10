import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./home/nome-modulo/nome-modulo.module').then(m => m.NomeModuloModule) }, { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }, { path: 'lightNovelDetails', loadChildren: () => import('./pages/light-novel-details/light-novel-details.module').then(m => m.LightNovelDetailsModule) }, { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) }, { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
