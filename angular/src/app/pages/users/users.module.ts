import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { CardHomeComponent } from '../../shared-components/card-home/card-home.component';

@NgModule({
  declarations: [UsersComponent, CardHomeComponent],
  imports: [CommonModule, UsersRoutingModule, NgbModule],
})
export class UsersModule {}
