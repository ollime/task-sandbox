import { Component } from '@angular/core';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
} from '@angular/material/card';

@Component({
  selector: 'app-add-project',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {}
