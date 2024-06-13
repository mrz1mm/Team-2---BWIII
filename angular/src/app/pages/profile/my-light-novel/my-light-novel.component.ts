import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { iLightNovel } from '../../../interfaces/i-light-novel';
import { LightNovelService } from '../../../services/light-novel.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-my-light-novel',
  templateUrl: './my-light-novel.component.html',
  styleUrl: './my-light-novel.component.scss',
})
export class MyLightNovelComponent implements OnInit {
  novels!: iLightNovel[];

  constructor(
    private lightNovelService: LightNovelService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId: number | null = this.authSvc.getCurrentUserId();
    if (userId) {
      this.lightNovelService.getNovelsByUserId(userId).subscribe((novels) => {
        this.novels = novels;
      });
    }
  }

  isFavourite: boolean = false;

  toggleFavourite(event: Event) {}

  redirectCreate(novel: iLightNovel) {
    console.log(novel);
    this.router.navigate([`/profile/createLightNovel/${novel.id}`]);
  }
}
