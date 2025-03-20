import { Routes } from '@angular/router';

export const CoordinatorRoutes: Routes = [
  {
    path: 'add-student',
    loadComponent:()=>import('./add-student-page/add-student-page.component').then(c => c.AddStudentPageComponent)
  },
];
