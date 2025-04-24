import { Routes } from '@angular/router';

export const ProgressRoutes: Routes = [
    {
        path: '',
        loadComponent:()=>import('./my-progress/my-progress.component').then(c => c.MyProgressComponent)
    }
];
