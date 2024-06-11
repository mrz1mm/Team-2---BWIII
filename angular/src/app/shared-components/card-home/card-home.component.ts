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

  // Metodo per sostituire gli spazi con trattini
  replaceSpacesWithDashes(input: string): string {
    return input.replace(/ /g, '-');
  }

  toggleFavourite(event: Event) {}
}
