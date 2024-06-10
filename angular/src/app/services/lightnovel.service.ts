import { Injectable } from '@angular/core';
import { SearchService } from './search.service';
import { UsersService } from './users.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LightnovelService {
  constructor(
    private searchSvc: SearchService,
    private usersSvc: UsersService
  ) {}

  private lightNovelsSubject = new BehaviorSubject<iLightNovel[]>([]);
  private lightNovels$ = this.lightNovelsSubject.asObservable();
}
