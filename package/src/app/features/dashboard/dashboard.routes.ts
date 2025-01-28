import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent:()=>import('./dashboard-page/dashboard-page.component').then(c => c.DashboardPageComponent)
  },
];
