import { Routes } from '@angular/router';

export const CompanyRoutes: Routes = [
  {
    path: '',
    redirectTo:'my-company',
    pathMatch:'full'
    
  },
  {
    path:'my-company',
    loadComponent:()=>import('./company-page/company-page.component').then(c => c.CompanyPageComponent)
  },
];
