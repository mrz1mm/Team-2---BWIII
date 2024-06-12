import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LightNovelService } from '../../services/light-novel.service';
import { AuthService } from '../../auth/auth.service';
import { iLightNovel } from '../../interfaces/i-light-novel';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.scss',
})
export class CardHomeComponent {
  constructor(
    private routerSvc: Router,
    private lightNovelSvc: LightNovelService,
    private authSvc: AuthService
  ) {
    this.userId = this.authSvc.getCurrentUserId();
  }

  @Input() lightNovelCard!: iLightNovel;

  isFavourite: boolean = false;
  userId: number | null;

  ngOnInit() {
    this.checkIfFavourite();
  }

  // metodo per controllare se il film è tra i preferiti
  checkIfFavourite() {
    if (this.userId !== null) {
      this.lightNovelSvc
        .getAllFavouriteLightNovels()
        .subscribe((favouriteLightNovels) => {
          this.isFavourite = favouriteLightNovels.some(
            (lightNovel) =>
              lightNovel.lightNovelId === this.lightNovelCard.id &&
              lightNovel.userId === this.userId
          );
        });
    }
  }

  // metodo per aggiungere o rimuovere un film dai preferiti
  toggleFavourite(event: Event) {
    event.preventDefault();

    if (this.isFavourite) {
      this.lightNovelSvc
        .removeFavouriteLightNovel(this.lightNovelCard.id, this.userId!)
        .subscribe({
          next: () => {
            this.isFavourite = false;
          },
          error: (error) => {
            console.error('Error removing favourite film:', error);
          },
        });
    } else {
      this.lightNovelSvc
        .addFavouriteLightNovel(this.lightNovelCard.id, this.userId!)
        .subscribe({
          next: () => {
            this.isFavourite = true;
          },
          error: (error) => {
            console.error('Error adding favourite film:', error);
          },
        });
    }
  }
}
