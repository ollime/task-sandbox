import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';
import { ProjectInfo } from './project-info/project-info';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'project-info',
    component: ProjectInfo,
  },
  {
    path: '**',
    component: NotFound,
  },
];
