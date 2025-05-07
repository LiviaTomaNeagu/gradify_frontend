import { Routes } from '@angular/router';

export const ForumRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Forum' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./forum-page/forum-list-page.component').then(c => c.ForumPageComponent)
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./question-details-page/question-details-page.component').then(c => c.QuestionDetailsPageComponent),
        data: { breadcrumb: 'Question Details' }
      }
    ]
  }
];
