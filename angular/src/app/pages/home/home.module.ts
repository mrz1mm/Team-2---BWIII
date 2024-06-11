import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared-components/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSplideModule } from 'ngx-splide';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgbModule,
    NgxSplideModule,
  ],
})
export class HomeModule {}
