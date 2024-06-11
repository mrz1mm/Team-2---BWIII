import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LightNovelService } from '../../services/light-novel.service';
import { AuthService } from '../../auth/auth.service';
import { iLightNovel } from '../../interfaces/i-light-novel';
import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

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

  ngAfterViewInit() {
    new Splide('.splide', {
      type: 'loop',
      drag: 'free',
      focus: 'center',
      perPage: 3,
      autoScroll: {
        speed: 1,
      },
      extensions: { AutoScroll },
    }).mount({ AutoScroll });
  }

  // Metodo per sostituire gli spazi con trattini
  replaceSpacesWithDashes(input: string): string {
    return input.replace(/ /g, '-');
  }
}
