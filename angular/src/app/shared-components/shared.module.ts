import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    UserCardComponent
  ],
})
export class SharedModule {}
