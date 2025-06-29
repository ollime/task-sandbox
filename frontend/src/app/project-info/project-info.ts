import { Component } from '@angular/core';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-info',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ProjectCard],
  templateUrl: './project-info.html',
  styleUrl: './project-info.css',
})
export class ProjectInfo {}
