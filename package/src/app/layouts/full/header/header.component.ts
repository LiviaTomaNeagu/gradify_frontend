import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  Signal,
  effect,
  computed,
  ChangeDetectorRef,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { NotificationService } from 'src/app/features/notifications/core/notification.service';
import { AppNotification } from 'src/app/features/notifications/core/notification.interfaces';
import { NotificationsComponent } from 'src/app/features/notifications/components/notifications/notifications.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, TablerIconsModule, MaterialModule, NotificationsComponent],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  currentUser: any = null;
  readonly RoleTypeEnum = RoleTypeEnum;
  notificationsArray: AppNotification[] = [];
  unreadCount: Signal<number>;

  constructor(private router: Router, private currentUserService: CurrentUserService, private notificationService: NotificationService, private cd: ChangeDetectorRef) {
    this.unreadCount = this.notificationService.unreadCount();

    effect(() => {
      const count = this.unreadCount(); // important să fie cu ()
      console.log("📍 unreadCount changed:", count);
      this.cd.detectChanges();
    });
  }

  get allNotifications(): AppNotification[] {
    return this.notificationService.notifications()();
  }

  ngOnInit() {
    this.currentUserService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  navigateToProfile() {
    this.router.navigate(['/my-profile']);
  }

  logout(){
    this.currentUserService.logoutUser();
  }
}