import { Component, Input } from '@angular/core';
import { iLightNovel } from '../../../interfaces/i-light-novel';

@Component({
  selector: 'app-tooltip-card',
  templateUrl: './tooltip-card.component.html',
  styleUrl: './tooltip-card.component.scss',
})
export class TooltipCardComponent {
  @Input() lightNovelCard!: iLightNovel;
}
