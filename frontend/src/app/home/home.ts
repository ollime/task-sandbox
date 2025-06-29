import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../task-list/task-list';
import { Task } from '../task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TaskList],
  templateUrl: './home.html',
  styleUrl: './../app.css',
})
export class Home {
  task: Task = {
    projectName: 'Test Project',
    size: 'SM',
    icon: 'none',
    subtasks: [],
  };
}
