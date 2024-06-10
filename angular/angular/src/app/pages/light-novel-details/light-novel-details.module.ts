import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightNovelDetailsRoutingModule } from './light-novel-details-routing.module';
import { LightNovelDetailsComponent } from './light-novel-details.component';


@NgModule({
  declarations: [
    LightNovelDetailsComponent
  ],
  imports: [
    CommonModule,
    LightNovelDetailsRoutingModule
  ]
})
export class LightNovelDetailsModule { }
