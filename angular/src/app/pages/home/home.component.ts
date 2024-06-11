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
  filteredLightNovelsArray: iLightNovel[] = [];
  genres: string[] = [];
  activeIndex: number | null = null;

  ngOnInit() {
    this.lightNovelSvc.lightNovels$.subscribe((lightNovels) => {
      this.lightNovelsArray = lightNovels;
      this.filteredLightNovelsArray = this.lightNovelsArray;
      this.genres = this.lightNovelSvc.getAllGenres();
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

  selectedGenre(genre: string) {
    this.filteredLightNovelsArray =
      this.lightNovelSvc.getLightNovelsByGenre(genre);
  }

  toggleActive(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null; // Deseleziona se clicca sullo stesso bottone
    } else {
      this.activeIndex = index;
    }
  }

  handleButtonClick(index: number, genre: string) {
    this.toggleActive(index);
    if (this.activeIndex !== null) {
      this.selectedGenre(genre);
    } else {
      this.filteredLightNovelsArray = this.lightNovelsArray; // Reset della lista se nessun genere è attivo
    }
  }
}
