import { Routes } from '@angular/router';

export const ChatRoutes: Routes = [
  {
    path: '',
    redirectTo:'chat',
    pathMatch:'full'
    
  },
  {
    path:'chat',
    loadComponent:()=>import('./components/chat/chat.component').then(c => c.AppChatComponent)
  },
];
