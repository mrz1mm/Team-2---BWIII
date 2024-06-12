import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { LightNovelService } from '../../../services/light-novel.service';
import { iUser } from '../../../auth/interfaces/i-user';
import { iLightNovel } from '../../../interfaces/i-light-novel';
import { iFavouriteLightNovel } from '../../../interfaces/i-favourite-light-novel';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
  private authSvc = inject(AuthService);
  private lightNovelSvc = inject(LightNovelService);

  user: iUser | null = this.authSvc.getCurrentUser();
  provvisoryArray: iFavouriteLightNovel[] = [];
  favouriteLightNovelArray: iLightNovel[] = [];

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      this.user = user;
      this.lightNovelSvc.favouriteLightNovels$.subscribe(
        (favouriteLightNovels) => {
          if (favouriteLightNovels) {
            this.provvisoryArray = favouriteLightNovels;
            this.loadFavouriteLightNovelsDetails();
          }
        }
      );
    });
  }

  loadFavouriteLightNovelsDetails(): void {
    this.lightNovelSvc.lightNovels$.subscribe((lightNovels) => {
      this.favouriteLightNovelArray = lightNovels.filter((lightNovel) =>
        this.provvisoryArray.some(
          (favouriteLightNovel) =>
            favouriteLightNovel.lightNovelId === lightNovel.id &&
            favouriteLightNovel.userId === this.user!.id
        )
      );
    });
  }
}
