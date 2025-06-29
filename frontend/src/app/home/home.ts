import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItem } from '../task-item/task-item';
import { Task } from '../task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TaskItem],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  taskList: Task[] = [
    {
      projectName: 'Test Project',
      size: 'SM',
      icon: 'none',
      subtasks: [],
    },
    {
      projectName: 'another test',
      size: 'SM',
      icon: 'none',
      subtasks: [],
    },
    {
      projectName: 'test',
      size: 'SM',
      icon: 'none',
      subtasks: [],
    },
    {
      projectName: 'fourth proj',
      size: 'SM',
      icon: 'none',
      subtasks: [],
    },
    {
      projectName: 'final',
      size: 'SM',
      icon: 'none',
      subtasks: [],
    },
  ];
}
