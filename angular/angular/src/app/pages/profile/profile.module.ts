import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { CreateLightNovelComponent } from './create-light-novel/create-light-novel.component';
import { MyLightNovelComponent } from './my-light-novel/my-light-novel.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ViewedComponent } from './viewed/viewed.component';


@NgModule({
  declarations: [
    ProfileComponent,
    CreateLightNovelComponent,
    MyLightNovelComponent,
    FavouritesComponent,
    ViewedComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
