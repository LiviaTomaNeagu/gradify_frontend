import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Personal Management',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    displayName: 'My Profile',
    iconName: 'layout-navbar-expand',
    bgcolor: 'error',
    route: '/ui-components/badge',
  }, {
    displayName: 'My Progress',
    iconName: 'rosette',
    bgcolor: 'warning',
    route: '/ui-components/badge',
  },
  {
    navCap: 'Community',
  },
  {
    displayName: 'Forum',
    iconName: 'list',
    bgcolor: 'success',
    route: '/forum',
  },
  {
    displayName: 'Chat',
    iconName: 'message-circle',
    bgcolor: 'warning',
    route: '/ui-components/chips',
  }
];
