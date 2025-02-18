import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { ValidateCodeComponent } from 'src/app/features/auth/components/validate-code/validate-code.component';
import { PendingApprovalComponent } from 'src/app/features/auth/components/pending-approval/pending-approval.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'validate-code',
        component: ValidateCodeComponent 
      },
      {
        path: 'pending-approval',
        component: PendingApprovalComponent
      }
    ],
  },
];
