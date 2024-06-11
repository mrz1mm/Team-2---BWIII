import { Injectable } from '@angular/core';
import { SearchService } from './search.service';
import { UsersService } from './users.service';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { iLightNovel } from '../interfaces/i-light-novel';
import { iFavouriteLightNovel } from '../interfaces/i-favourite-light-novel';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LightNovelService {
  constructor(
    private httpSvc: HttpClient,
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

  private favouriteLightNovelsSubject = new BehaviorSubject<
    iFavouriteLightNovel[]
  >([]);
  favouriteLightNovels$ = this.favouriteLightNovelsSubject.asObservable();
  private favouriteLightNovelsArray: iFavouriteLightNovel[] = [];

  searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  lightNovelsUrl: string = `${environment.apiUrl}/lightnovels`;
  favouriteLightNovelsUrl: string = `${environment.apiUrl}/favourite-lightNovels`;

  // metodo per ottenere tutti le lightnovel
  getAllLightNovels(): void {
    this.httpSvc
      .get<iLightNovel[]>(this.lightNovelsUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching light novels:', error.message);
          return throwError(
            () => new Error('Error fetching light novels: ' + error.message)
          );
        })
      )
      .subscribe((data) => {
        this.lightNovelsArray = data;
        this.originalLightNovelsArray = data; // salva una copia dell'array che serve per la ricerca
        this.lightNovelsSubject.next(this.lightNovelsArray);
      });
  }

  // metodo per ottenere una lightnovel tramite id
  getLightNovelById(id: number): Observable<iLightNovel | undefined> {
    return this.lightNovels$.pipe(
      map((data) => data.find((data) => data.id === id))
    );
  }
  getNovelsByUserId(userId: number): Observable<iLightNovel[]> {
    const url = `${this.lightNovelsUrl}?userId=${userId}`;
    return this.httpSvc.get<iLightNovel[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching light novels by user id:', error.message);
        return throwError(
          () =>
            new Error(
              'Error fetching light novels by user id: ' + error.message
            )
        );
      })
    );
  }

  // metodo per ottenere una lightnovel tramite slug
  getLightNovelBySlug(slug: string): Observable<iLightNovel | undefined> {
    return this.lightNovels$.pipe(
      map((data) => data.find((data) => data.slug === slug)),
      catchError((error) =>
        throwError(
          () => new Error('Error fetching favourite films:', error.message)
        )
      )
    );
  }

  // metodo per aggiungere una lightnovel
  addLightNovel(newLightNovel: Partial<iLightNovel>) {
    return this.httpSvc.post(this.lightNovelsUrl, newLightNovel);
  }

  // metodo per aggiornare una lightnovel
  updateLightNovel() {}

  // metodo per eliminare una lightnovel
  deleteLightNovel() {}

  // metodo per ottenere tutte le lightnovel preferite
  getAllFavouriteLightNovels(): Observable<iFavouriteLightNovel[] | undefined> {
    return this.httpSvc
      .get<iFavouriteLightNovel[]>(this.favouriteLightNovelsUrl)
      .pipe(
        tap((data) => {
          this.favouriteLightNovelsArray = data;
          this.favouriteLightNovelsSubject.next(this.favouriteLightNovelsArray);
        }),
        catchError((error) =>
          throwError(
            () => new Error('Error fetching favourite films:', error.message)
          )
        )
      );
  }

  // Metodo per aggiungere una light novel ai preferiti
  addFavouriteLightNovel(
    lightNovelId: number,
    userId: number
  ): Observable<void> {
    return this.httpSvc
      .post<iFavouriteLightNovel>(this.favouriteLightNovelsUrl, {
        lightNovelId,
        userId,
      })
      .pipe(
        tap((newFavouriteLightNovel) => {
          this.favouriteLightNovelsArray.push(newFavouriteLightNovel);
          this.favouriteLightNovelsSubject.next([
            ...this.favouriteLightNovelsArray,
          ]);
        }),
        map(() => {}),
        catchError((error) => {
          console.error(
            "Errore durante l'aggiunta della light novel ai preferiti",
            error.message
          );
          return throwError(
            () =>
              new Error(
                "Errore durante l'aggiunta della light novel ai preferiti: " +
                  error.message
              )
          );
        })
      );
  }

  // Metodo per rimuovere una light novel dai preferiti
  removeFavouriteLightNovel(
    lightNovelId: number,
    userId: number
  ): Observable<void> {
    // Cerca la light novel nei preferiti
    return this.httpSvc
      .get<iFavouriteLightNovel[]>(
        `${this.favouriteLightNovelsUrl}?lightNovelId=${lightNovelId}&userId=${userId}`
      )
      .pipe(
        // Se la light novel è tra i preferiti, rimuovila
        switchMap((favouriteLightNovels) => {
          const favouriteLightNovel = favouriteLightNovels[0];
          if (favouriteLightNovel) {
            return this.httpSvc
              .delete<void>(
                `${this.favouriteLightNovelsUrl}/${favouriteLightNovel.id}`
              )
              .pipe(
                tap(() => {
                  this.favouriteLightNovelsArray =
                    this.favouriteLightNovelsArray.filter(
                      (lightNovel) =>
                        lightNovel.lightNovelId !== lightNovelId ||
                        lightNovel.userId !== userId
                    );
                  this.favouriteLightNovelsSubject.next([
                    ...this.favouriteLightNovelsArray,
                  ]);
                })
              );
          } else {
            return throwError(
              () => new Error('Favourite light novel not found')
            );
          }
        }),
        catchError((error) => {
          console.error('Error removing favourite light novel:', error.message);
          return throwError(
            () =>
              new Error(
                'Error removing favourite light novel: ' + error.message
              )
          );
        })
      );
  }

  getAllGenres(): string[] {
    const genres = this.lightNovelsArray.map((lightNovel) => lightNovel.genre);
    const genresArray = genres.flat();
    const uniqueGenres = [...new Set(genresArray)];
    return uniqueGenres.sort();
  }

  // metodo per ottenere le lightnovel preferite di un utente
  getLightNovelsByGenre(genre: string): iLightNovel[] {
    return this.lightNovelsArray.filter((lightNovel) =>
      lightNovel.genre.includes(genre)
    );
  }

  // metodo per ottenere il termine di ricerca
  getSearchTerm() {}

  // metodo per cercare una lightnovel tramite titolo

  searchByLightNovelTitle() {}
}
