import { Component, input } from '@angular/core';
import { Task } from '../task';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  task = input.required<Task>();
}
