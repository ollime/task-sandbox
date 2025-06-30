import { Component } from '@angular/core';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { ProgressBar } from '../progress-bar/progress-bar';

@Component({
  selector: 'app-project-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    ProgressBar,
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {}
