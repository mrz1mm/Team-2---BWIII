import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CreateLightNovelComponent } from './create-light-novel/create-light-novel.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MyLightNovelComponent } from './my-light-novel/my-light-novel.component';
import { AuthGuard } from '../../auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  {
    path: 'createLightNovel',canActivate: [AuthGuard],
    component: CreateLightNovelComponent,
  },
  {
    path: 'createLightNovel/:id',
    component: CreateLightNovelComponent,canActivate: [AuthGuard],
  },
  {
    path: 'favourites',
    component: FavouritesComponent,canActivate: [AuthGuard],
  },
  {
    path: 'myLightNovels',
    component: MyLightNovelComponent,canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
