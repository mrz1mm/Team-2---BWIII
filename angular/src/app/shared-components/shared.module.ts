import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LightNovelFormComponent } from './light-novel-form/light-novel-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardHomeComponent } from './card-home/card-home.component';

@NgModule({
  declarations: [LightNovelFormComponent, CardHomeComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [CardHomeComponent, LightNovelFormComponent],
})
export class SharedModule {}
