import { Routes } from '@angular/router';

export const CoordinatorRoutes: Routes = [
  {
    path: 'add-student',
    loadComponent:()=>import('./add-student-page/add-student-page.component').then(c => c.AddStudentPageComponent)
  },
  {
    path: 'my-students',
    loadComponent:()=>import('./my-students/my-students.component').then(c => c.MyStudentsComponent)
  },
];
