import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthenticationRoutes } from './pages/authentication/authentication.routes';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.DashboardRoutes),
      },
      {
        path: 'forum',
        loadChildren: () =>
          import('./features/forum/forum.routes').then((m) => m.ForumRoutes),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.routes').then((m) => m.UsersRoutes),
      },
      {
        path: 'my-company', // Add Forum here as a separate route
        loadChildren: () =>
          import('./features/company/company.routes').then((m) => m.CompanyRoutes),
      },
      {
        path: 'lists', // Add Forum here as a separate route
        loadChildren: () =>
          import('./features/lists-admin/lists-admin.routes').then((m) => m.ListsAdminRoutes),
      },
    ],
  },
  {
    path: 'auth',
    component: BlankComponent,
    children: AuthenticationRoutes,
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
