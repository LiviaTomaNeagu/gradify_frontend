import { Routes } from '@angular/router';

export const AccountRoutes: Routes = [
  {
    path: '',
    redirectTo:'my-profile',
    pathMatch:'full'
    
  },
  {
    path:'my-profile',
    loadComponent:()=>import('./my-profile/my-profile.component').then(c => c.MyProfileComponent)
  },
];
