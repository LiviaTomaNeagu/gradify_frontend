import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthenticationRoutes } from './pages/authentication/authentication.routes';
import { AuthGuard } from './@core/guards/auth.guard';
import { NonAuthGuard } from './@core/guards/non-auth.guard';

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
        canActivate:[AuthGuard]
      },
      {
        path: 'forum',
        loadChildren: () =>
          import('./features/forum/forum.routes').then((m) => m.ForumRoutes),
        canActivate:[AuthGuard]
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.routes').then((m) => m.UsersRoutes),
        canActivate:[AuthGuard]
      },
      {
        path: 'my-company',
        loadChildren: () =>
          import('./features/company/company.routes').then((m) => m.CompanyRoutes),
        canActivate:[AuthGuard]
      },
      {
        path: 'my-profile',
        loadChildren: () =>
          import('./features/account/account.routes').then((m) => m.AccountRoutes),
        canActivate:[AuthGuard]
      },
      {
        path: 'lists',
        loadChildren: () =>
          import('./features/lists-admin/lists-admin.routes').then((m) => m.ListsAdminRoutes),
        canActivate:[AuthGuard]
      },
      {
        path: 'coordinator',
        loadChildren: () =>
          import('./features/coordinator/coordinator.routes').then((m) => m.CoordinatorRoutes),
        canActivate:[AuthGuard]
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./features/chat/chat.routes').then((m) => m.ChatRoutes),
        canActivate:[AuthGuard]
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('./features/progress/progress.routes').then((m) => m.ProgressRoutes),
        canActivate:[AuthGuard]
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./features/calendar/calendar.routes').then((m) => m.CalendarRoutes),
        canActivate:[AuthGuard]
      },
      {
        path: 'advanced-search',
        loadChildren: () =>
          import('./features/advanced-search/advanced-search.routes').then((m) => m.SearchRoutes),
        canActivate:[AuthGuard]
      }
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
