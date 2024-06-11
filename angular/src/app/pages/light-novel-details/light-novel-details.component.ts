import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iLightNovel } from '../../interfaces/i-light-novel';
import { LightNovelService } from '../../services/light-novel.service';

@Component({
  selector: 'app-light-novel-details',
  templateUrl: './light-novel-details.component.html',
  styleUrl: './light-novel-details.component.scss',
})
export class LightNovelDetailsComponent implements OnInit {
  lightNovel: iLightNovel | undefined;

  constructor(
    private route: ActivatedRoute,
    private lightNovelService: LightNovelService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.lightNovelService.getLightNovelById(id).subscribe((lightNovel) => {
      this.lightNovel = lightNovel;
    });
  }
}
