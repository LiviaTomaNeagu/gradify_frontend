import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { NavItem } from './nav-item/nav-item';
import { R } from '@angular/cdk/keycodes';

export const navItems: NavItem[] = [
  {
    navCap: 'Personal Management',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.ADMIN_CORPORATE, RoleTypeEnum.ADMIN, RoleTypeEnum.MENTOR, RoleTypeEnum.COORDINATOR],
  },
  
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.COORDINATOR, RoleTypeEnum.MENTOR, RoleTypeEnum.ADMIN_CORPORATE],
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
    displayName: 'Companies List',
    iconName: 'layout-dashboard',
    bgcolor: 'success',
    route: '/lists/companies',
    roles: [RoleTypeEnum.ADMIN],
  },
  {
    displayName: 'Groups',
    iconName: 'layout-navbar-expand',
    bgcolor: 'warning',
    route: '/lists/groups',
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
    displayName: 'Add Student',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/coordinator/add-student',
    roles: [RoleTypeEnum.COORDINATOR],
  },
  {
    displayName: 'My Students',
    iconName: 'list',
    bgcolor: 'success',
    route: '/coordinator/my-students',
    roles: [RoleTypeEnum.COORDINATOR],
  },
  {
    displayName: 'Calendar',
    iconName: 'calendar',
    bgcolor: 'primary',
    route: '/calendar',
    roles: [RoleTypeEnum.COORDINATOR]
  },
  {
    displayName: 'My Progress',
    iconName: 'rosette',
    bgcolor: 'warning',
    route: '/progress',
    roles: [RoleTypeEnum.STUDENT],
  },
  {
    displayName: 'My Company',
    iconName: 'rosette',
    bgcolor: 'warning',
    route: 'lists/companies',
    roles: [RoleTypeEnum.MENTOR],
  },
  {
    navCap: 'Community',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.MENTOR, RoleTypeEnum.COORDINATOR, RoleTypeEnum.ADMIN_CORPORATE],
  },
  {
    displayName: 'Forum',
    iconName: 'list',
    bgcolor: 'success',
    route: '/forum',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.MENTOR, RoleTypeEnum.COORDINATOR, RoleTypeEnum.ADMIN_CORPORATE],
  },
  {
    displayName: 'Chat',
    iconName: 'message-circle',
    bgcolor: 'warning',
    route: '/chat',
    roles: [RoleTypeEnum.STUDENT, RoleTypeEnum.MENTOR, RoleTypeEnum.COORDINATOR, RoleTypeEnum.ADMIN_CORPORATE],
  },


];
