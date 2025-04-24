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
        path: 'my-company',
        loadChildren: () =>
          import('./features/company/company.routes').then((m) => m.CompanyRoutes),
      },
      {
        path: 'my-profile',
        loadChildren: () =>
          import('./features/account/account.routes').then((m) => m.AccountRoutes),
      },
      {
        path: 'lists',
        loadChildren: () =>
          import('./features/lists-admin/lists-admin.routes').then((m) => m.ListsAdminRoutes),
      },
      {
        path: 'coordinator',
        loadChildren: () =>
          import('./features/coordinator/coordinator.routes').then((m) => m.CoordinatorRoutes),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./features/chat/chat.routes').then((m) => m.ChatRoutes),
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('./features/progress/progress.routes').then((m) => m.ProgressRoutes),
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
