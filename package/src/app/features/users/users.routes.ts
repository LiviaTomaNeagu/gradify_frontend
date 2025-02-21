import { Routes } from '@angular/router';

export const UsersRoutes: Routes = [
  {
    path: '',
    redirectTo:'mentors',
    pathMatch:'full'
    
  },
  {
    path:'mentors',
    loadComponent:()=>import('./users-page/users-page.component').then(c => c.UsersPageComponent)
  },
];
