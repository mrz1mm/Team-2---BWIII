import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardModule } from '../../shared-components/user-card/user-card.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule,UserCardModule],
})
export class UsersModule {}
