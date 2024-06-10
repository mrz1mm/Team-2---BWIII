import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'lightNovelDetails',
    loadChildren: () =>
      import('./pages/light-novel-details/light-novel-details.module').then(
        (m) => m.LightNovelDetailsModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'page401',
    loadChildren: () =>
      import('./pages/page401/page401.module').then((m) => m.Page401Module),
  },
  {
    path: 'page404',
    loadChildren: () =>
      import('./pages/page404/page404.module').then((m) => m.Page404Module),
  },
  {
    path: '**',
    redirectTo: 'page404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
