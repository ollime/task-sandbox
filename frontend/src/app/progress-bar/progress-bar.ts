/** Progress bar component from 0 to 100% */

import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {
  @HostBinding('style.--progress')
  @HostBinding('style.--incomplete')
  @HostBinding('style.--progress-color')
  progress: number = 10;
  incomplete: number = 100 - this.progress;
  progressColor: string = 'green';
}
