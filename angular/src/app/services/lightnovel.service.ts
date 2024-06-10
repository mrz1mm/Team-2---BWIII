import { Injectable } from '@angular/core';
import { SearchService } from './search.service';
import { UsersService } from './users.service';
import { BehaviorSubject } from 'rxjs';
import { iLightNovel } from '../interfaces/i-light-novel';
import { iFavouriteLightNovel } from '../interfaces/i-favourite-light-novel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LightnovelService {
  constructor(
    private searchSvc: SearchService,
    private usersSvc: UsersService
  ) {
    this.getAllLightNovels();
    this.getAllFavouriteLightNovels();
  }

  private lightNovelsSubject = new BehaviorSubject<iLightNovel[]>([]);
  lightNovels$ = this.lightNovelsSubject.asObservable();
  private lightNovelsArray: iLightNovel[] = [];
  private originalLightNovelsArray: iLightNovel[] = []; // copia dell'array originale (ai fini della ricerca)

  private favouriteLightNovelSubject = new BehaviorSubject<
    iFavouriteLightNovel[]
  >([]);
  favouriteLightNovel$ = this.favouriteLightNovelSubject.asObservable();
  private favouriteLightNovelArray: iFavouriteLightNovel[] = [];

  searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  lightNovelsUrl: string = '${environment.apiUrl}/lightnovels';
  favouriteLightNovelsUrl: string =
    '${environment.apiUrl}/favourite-lightnovels';

  getAllLightNovels() {}
  getLightNovelById() {}
  addLightNovel() {}
  updateLightNovel() {}
  deleteLightNovel() {}

  getAllFavouriteLightNovels() {}
  getFavouriteLightNovelById() {}
  addFavouriteLightNovel() {}
  updateFavouriteLightNovel() {}
  deleteFavouriteLightNovel() {}

  getSearchTerm() {}
  searchByLightNovelTitle() {}
}
