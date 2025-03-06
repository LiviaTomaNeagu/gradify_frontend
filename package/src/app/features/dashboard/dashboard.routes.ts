import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent:()=>import('./dashboard-page/dashboard-page.component').then(c => c.DashboardPageComponent)
  },
  {
    path: 'mentor',
    loadComponent:()=>import('./dashboard-mentor/dashboard-mentor.component').then(c => c.DashboardMentorComponent)
  }
];
