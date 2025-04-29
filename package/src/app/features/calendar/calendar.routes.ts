import { Routes } from '@angular/router';

export const CalendarRoutes: Routes = [
    {
        path: '',
        loadComponent:()=>import('./calendar-page/calendar-page.component').then(c => c.CalendarPageComponent)
    }
];
