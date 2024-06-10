import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LightnovelService } from '../../services/lightnovel.service';
import { SearchService } from '../../services/search.service';
import { iUser } from '../../auth/interfaces/i-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private routerSvc: Router,
    private authSvc: AuthService,
    private searchSvc: SearchService,
    private lightNovelSvc: LightnovelService
  ) {}

  links = [
    { name: 'Home', url: '/' },
    { name: 'CreateLightNovel', url: '/createLightNovel' },
    { name: 'Favourites', url: '/favourites' },
    { name: 'MyLightNovels', url: '/myLightNovels' },
    { name: 'Viewed', url: '/viewed' },
    { name: 'Users', url: '/users' },
  ];

  isLoggedIn$ = this.authSvc.isLoggedIn$;
  user: iUser | null = this.authSvc.getCurrentUser();

  // effettua il logout
  logout() {
    this.authSvc.logout();
  }

  // effettua la ricerca di una lightnovel
  onSearch(event: Event) {}

  // effettua la ricerca di una lightnovel
  searchLightNovel(searchTerm: string) {}
}
