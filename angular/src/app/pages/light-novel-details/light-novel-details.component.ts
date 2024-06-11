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
  currentPart: string = 'part1';

  constructor(
    private route: ActivatedRoute,
    private lightNovelService: LightNovelService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.lightNovelService.getLightNovelById(id).subscribe((lightNovel) => {
      this.lightNovel = lightNovel;
      console.log('Light novel loaded:', this.lightNovel); // Debugging log
    });
  }

  chooseFirstChoice(choice: string) {
    console.log('First choice selected:', choice);
    if (choice === 'choice1') {
      this.currentPart = 'part2A';
    } else if (choice === 'choice2') {
      this.currentPart = 'part2B';
    }
    console.log('Current part:', this.currentPart);
  }

  chooseSecondChoice(choice: string) {
    console.log('Second choice selected:', choice);
    if (choice === 'choice1') {
      this.currentPart = 'part3A';
    } else if (choice === 'choice2') {
      this.currentPart = 'part3B';
    } else if (choice === 'choice3') {
      this.currentPart = 'part3C';
    } else if (choice === 'choice4') {
      this.currentPart = 'part3D';
    }
    console.log('Current part:', this.currentPart);
  }
}
