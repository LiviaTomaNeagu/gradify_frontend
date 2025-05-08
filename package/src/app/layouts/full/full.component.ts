import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { navItems } from './sidebar/sidebar-data';
import { NavService } from '../../services/nav.service';
import { AppNavItemComponent } from './sidebar/nav-item/nav-item.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HeaderComponent } from './header/header.component';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { CurrentUserResponseInterfaceDTO } from 'src/app/@core/interfaces/user.interface';
import { NotificationService } from 'src/app/features/notifications/core/notification.service';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';


@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    RouterModule,
    AppNavItemComponent,
    MaterialModule,
    CommonModule,
    SidebarComponent,
    NgScrollbarModule,
    TablerIconsModule,
    HeaderComponent,
  ],
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FullComponent implements OnInit {

  navItems = navItems;

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav | any;

  //get options from service
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  isLoading: boolean = true;
  private readonly subscription: Subscription = new Subscription();

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private userService: CurrentUserService, private notificationService: NotificationService, private router: Router) {

    this.htmlElement = document.querySelector('html')!;
    this.htmlElement.classList.add('light-theme');
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes

        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];

        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
      });

    this.initializeUserAndLayout();
    this.subscription.add(
      this.userService.currentUser$.subscribe({
        next: (user: CurrentUserResponseInterfaceDTO | null) => {
          if (user) {
            this.isLoading = false;
            this.notificationService.startConnection();
          }
        },
        error: () => {
          this.isLoading = false;
        },
      })
    );

  }

  ngOnInit(): void { 
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe(); 
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
  }

  async initializeUserAndLayout() {
    await this.userService.initializeCurrentUser();
    this.filterNavItems();
  }

  filterNavItems() {
    const userRole = this.userService.getCurrentUserInfo()?.role;
    const userCompanyId = this.userService.getCurrentUserInfo()?.occupationId;

    this.navItems = this.navItems.map(item => {
        if (item.route === 'lists/companies' && item.displayName === 'My Company' && userCompanyId) {
            return { ...item, route: `lists/companies/${userCompanyId}` };
        }
        return item;
    }).filter(item => !item.roles || (userRole && item.roles.includes(userRole)));
}

  
}
