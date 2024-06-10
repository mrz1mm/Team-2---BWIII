import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserCardComponent } from './user-card/user-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [CommonModule, RouterModule,NgbModule],
  exports: [
    UserCardComponent
  ],
})
export class SharedModule {}
