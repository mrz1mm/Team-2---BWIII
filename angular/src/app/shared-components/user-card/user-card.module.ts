import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],exports: [
    UserCardComponent
  ]
})
export class UserCardModule { }
