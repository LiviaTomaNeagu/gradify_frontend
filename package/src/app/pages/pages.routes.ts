import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ForumComponent } from '../features/forum/forum.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },
  {
    path: 'forum', // Top-level route for Forum
    component: ForumComponent, // Directly reference ForumComponent
    data: {
      title: 'Forum',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Forum', url: '/forum' },
      ],
    },
  },
];
