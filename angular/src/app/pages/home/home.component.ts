import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LightNovelService } from '../../services/light-novel.service';
import { AuthService } from '../../auth/auth.service';
import { iLightNovel } from '../../interfaces/i-light-novel';
import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { UsersService } from '../../services/users.service';
import { iUser } from '../../auth/interfaces/i-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private routerSvc: Router,
    private lightNovelSvc: LightNovelService,
    private authSvc: AuthService,
    private usersSvc: UsersService
  ) {}

  usersArray: iUser[] = [];
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

    this.usersSvc.users$.subscribe((users) => {
      if (users) {
        this.usersArray = users;
      }
    });
  }

  ngAfterViewInit() {
    new Splide('.splide', {
      type: 'loop',
      drag: 'free',
      focus: 'center',
      arrows: false,
      pagination: false,
      height: 230,
      perPage: 8,
      autoScroll: {
        speed: 1,
      },
      extensions: { AutoScroll },
      breakpoints: {
        1800: {
          perPage: 7,
          height: 230,
        },
        1600: {
          perPage: 6,
          height: 230,
        },
        1400: {
          perPage: 5,
          height: 230,
        },
        1200: {
          perPage: 4,
          height: 230,
        },
        992: {
          perPage: 3,
          height: 230,
        },
      },
    }).mount({ AutoScroll });
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
