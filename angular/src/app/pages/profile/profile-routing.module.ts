import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CreateLightNovelComponent } from './create-light-novel/create-light-novel.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MyLightNovelComponent } from './my-light-novel/my-light-novel.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  {
    path: 'createLightNovel',
    component: CreateLightNovelComponent,
  },
  {
    path: 'createLightNovel/:id',
    component: CreateLightNovelComponent,
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
  },
  {
    path: 'myLightNovels',
    component: MyLightNovelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
