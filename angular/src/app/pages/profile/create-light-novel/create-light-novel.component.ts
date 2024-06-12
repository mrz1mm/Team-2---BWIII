import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LightNovelService } from '../../../services/light-novel.service';
import { iLightNovel } from '../../../interfaces/i-light-novel';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-create-light-novel',
  templateUrl: './create-light-novel.component.html',
  styleUrl: './create-light-novel.component.scss',
})
export class CreateLightNovelComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private novelSVC: LightNovelService
  ) {}

  lightNovelId!: number;
  novel: iLightNovel | undefined = undefined;

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.lightNovelId = parseInt(params.id);
      console.log('light novel id:', this.lightNovelId);

      this.novelSVC.getLightNovelById(this.lightNovelId).subscribe((data) => {
        this.novel = data;
      });
    });
    console.log('questa è la light novel', this.novel);
  }
}
