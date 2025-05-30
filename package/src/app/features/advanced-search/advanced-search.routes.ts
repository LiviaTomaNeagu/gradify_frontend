import { Routes } from '@angular/router';

export const SearchRoutes: Routes = [

  {
    path: '',
    loadComponent:()=>import('./components/search/search.component').then(c => c.SearchComponent)
  },
];
