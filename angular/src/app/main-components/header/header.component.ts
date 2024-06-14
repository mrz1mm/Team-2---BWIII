import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LightNovelService } from '../../services/light-novel.service';
import { SearchService } from '../../services/search.service';
import { iUser } from '../../auth/interfaces/i-user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,OnDestroy{
  constructor(
    private routerSvc: Router,
    private authSvc: AuthService,
    private searchSvc: SearchService,
    private lightNovelSvc: LightNovelService
  ) {}
  private unsubscribe$ = new Subject<void>();
  role: string | null = null;

  links = [
    { name: 'Home', url: '/' },
    { name: 'CreateLightNovel', url: '/profile/createLightNovel' },
    { name: 'Favourites', url: '/profile/favourites' },
    { name: 'MyLightNovels', url: '/profile/myLightNovels' },
    { name: 'Users', url: '/users' },
  ];
  show:boolean = false;
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

ngOnInit(): void {
  this.authSvc.getCurrentUserRole()
    .subscribe(role => {
      this.role = role;
      console.log('Current user role:', this.role);
    });
}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
