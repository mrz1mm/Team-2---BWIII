import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightNovelDetailsComponent } from './light-novel-details.component';

const routes: Routes = [{ path: '', component: LightNovelDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LightNovelDetailsRoutingModule { }
