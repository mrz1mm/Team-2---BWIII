import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LightNovelService } from '../../services/light-novel.service';
import { AuthService } from '../../auth/auth.service';
import { iLightNovel } from '../../interfaces/i-light-novel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private routerSvc: Router,
    private lightNovelSvc: LightNovelService,
    private authSvc: AuthService
  ) {}

  lightNovelsArray: iLightNovel[] = [];

  ngOnInit() {
    this.lightNovelSvc.lightNovels$.subscribe((lightNovels) => {
      this.lightNovelsArray = lightNovels;
      console.log('lightNovelsArray:', this.lightNovelsArray);
    });
  }
}
