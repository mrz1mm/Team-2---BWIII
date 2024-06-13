import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LightNovelFormComponent } from './light-novel-form/light-novel-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardHomeComponent } from './card-home/card-home.component';
import { UserCardComponent } from './user-card/user-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipCardComponent } from './tooltip-card/tooltip-card.component';

@NgModule({
  declarations: [
    LightNovelFormComponent,
    CardHomeComponent,
    UserCardComponent,
    TooltipCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
  ],
  exports: [CardHomeComponent, LightNovelFormComponent, UserCardComponent],
})
export class SharedModule {}
