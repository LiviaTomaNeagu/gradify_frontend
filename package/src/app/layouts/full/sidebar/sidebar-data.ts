import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { NavItem } from './nav-item/nav-item';
import { R } from '@angular/cdk/keycodes';

export const navItems: NavItem[] = [
  {
    navCap: 'Personal Management',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.ADMIN_CORPORATE, RoleTypeEnum.ADMIN],
  },
  {
    displayName: 'Students List',
    iconName: 'list',
    bgcolor: 'primary',
    route: '/lists/students',
    roles: [RoleTypeEnum.ADMIN],
  },
  {
    displayName: 'Teachers List',
    iconName: 'list-details',
    bgcolor: 'primary',
    route: '/lists/teachers',
    roles: [RoleTypeEnum.ADMIN],
  },
  {
    displayName: 'My Company',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/my-company',
    roles: [RoleTypeEnum.ADMIN_CORPORATE],
  },
  
  {
    displayName: 'Users',
    iconName: 'layout-navbar-expand',
    bgcolor: 'success',
    route: '/users',
    roles: [RoleTypeEnum.ADMIN_CORPORATE],
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.MENTOR],
  },
  {
    displayName: 'My Progress',
    iconName: 'rosette',
    bgcolor: 'warning',
    route: '/ui-components/badge',
    roles: [RoleTypeEnum.STUDENT],
  },
  {
    navCap: 'Community',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.MENTOR],
  },
  {
    displayName: 'Forum',
    iconName: 'list',
    bgcolor: 'success',
    route: '/forum',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.MENTOR],
  },
  {
    displayName: 'Chat',
    iconName: 'message-circle',
    bgcolor: 'warning',
    route: '/ui-components/chips',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.MENTOR],
  }
];
