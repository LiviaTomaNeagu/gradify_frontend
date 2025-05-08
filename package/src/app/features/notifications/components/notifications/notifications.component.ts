import { Component } from '@angular/core';
import { NotificationService } from '../../core/notification.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NotificationTypeEnum } from 'src/app/shared/enums/notification-type.enum';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AppNotification } from '../../core/notification.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule],
})
export class NotificationsComponent {
  notifications = this.notificationService.notifications();

  constructor(private notificationService: NotificationService, private router: Router) {}

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }
  
  getNotificationIcon(type: NotificationTypeEnum): string {
    return type === NotificationTypeEnum.CHAT ? 'message-circle' : 'message-2';
  }

  getNotificationClass(type: NotificationTypeEnum): string {
    return type === NotificationTypeEnum.CHAT ? 'notif-chat' : 'notif-forum';
  }

  handleClick(notification: AppNotification): void {
    console.log('Notification clicked:', notification);
    notification.read = true;
    if (notification.route) {
      this.router.navigate([notification.route]);
    }
  }
}
