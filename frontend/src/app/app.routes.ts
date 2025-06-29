import { Routes } from '@angular/router';
import { AddProject } from './add-project/add-project';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'add-project',
    component: AddProject,
  },
  {
    path: '**',
    component: NotFound,
  },
];
