import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iLightNovel } from '../../interfaces/i-light-novel';
import { LightNovelService } from '../../services/light-novel.service';

@Component({
  selector: 'app-light-novel-details',
  templateUrl: './light-novel-details.component.html',
  styleUrls: ['./light-novel-details.component.scss'],
})
export class LightNovelDetailsComponent implements OnInit {
  lightNovel: iLightNovel | undefined;
  currentPart: string = 'part1';
  imagePath: string = '';
  imagePath2: string =
    '../../../assets/img/lightNovelImg/Il Segreto del Libro Antico.png';

  constructor(
    private route: ActivatedRoute,
    private lightNovelService: LightNovelService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.lightNovelService.getLightNovelById(id).subscribe((lightNovel) => {
      this.lightNovel = lightNovel;
      this.imagePath = `../../../assets/img/lightNovelImg/${this.lightNovel?.title}.png`;

      console.log('Light novel loaded:', this.lightNovel);
      console.log('Image path:', this.imagePath);
    });
  }

  chooseFirstChoice(choice: string) {
    if (choice === 'choice1') {
      this.currentPart = 'part2A';
    } else if (choice === 'choice2') {
      this.currentPart = 'part2B';
    }
  }

  chooseSecondChoice(choice: string) {
    if (choice === 'choice1') {
      this.currentPart = 'part3A';
    } else if (choice === 'choice2') {
      this.currentPart = 'part3B';
    } else if (choice === 'choice3') {
      this.currentPart = 'part3C';
    } else if (choice === 'choice4') {
      this.currentPart = 'part3D';
    }
  }
}
