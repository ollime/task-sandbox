import { Component, input } from '@angular/core';
import { Task } from '../task';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-list',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  task = input.required<Task>();
}
