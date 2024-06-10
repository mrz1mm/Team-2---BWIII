import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LightNovelFormComponent } from './light-novel-form/light-novel-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LightNovelFormComponent
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [],
})
export class SharedModule {}
