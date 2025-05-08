import { Injectable, Signal, inject, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppNotification } from './notification.interfaces';
import { NotificationTypeEnum } from 'src/app/shared/enums/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection!: signalR.HubConnection;
  private currentUserService = inject(CurrentUserService);
  private notificationsSignal = signal<AppNotification[]>([]);
  private unreadCountSignal = signal<number>(0);

  constructor(private toastr: ToastrService) {}

  public notifications(): Signal<AppNotification[]> {
    return this.notificationsSignal.asReadonly();
  }

  public unreadCount() {
    return this.unreadCountSignal.asReadonly();
  }

  private updateUnreadCount() {
    const unread = this.notificationsSignal().filter(n => !n.read).length;
    console.log("🔄 Updating unreadCount:", unread);
    this.unreadCountSignal.set(unread);
  }

  public addUnreadCount(){
    const currentCount = this.unreadCountSignal();
    this.unreadCountSignal.set(currentCount + 1);
  }

  public markAllAsRead(): void {
    const updated = this.notificationsSignal().map(n => ({ ...n, read: true }));
    this.notificationsSignal.set(updated);
    this.updateUnreadCount();
  }

  public startConnection(): void {
    const currentUser = this.currentUserService.getCurrentUserInfo();
    console.log("🔍 currentUser in startConnection:", currentUser);
    if (!currentUser) return;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7176/notificationHub?userId=${currentUser.id}`, {
        withCredentials: true
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('🔔 NotificationHub connected'))
      .catch(err => console.error('❌ NotificationHub connection error:', err));

    this.hubConnection.on("ReceiveNotification", (data) => {
        var route = undefined;
        if(data.type === NotificationTypeEnum.FORUM && data.questionId) {
            route = `/forum/details/${data.questionId}`;
        } else route = `/chat/chat`;

        console.log("Notification received:", data);
        const newNotif: AppNotification = {
            title: data.title,
            message: data.message,
            timestamp: new Date(),
            read: false,
            type: data.Type ?? NotificationTypeEnum.FORUM,
            route: route,
        };
        

        this.notificationsSignal.set([newNotif, ...this.notificationsSignal()]);
        this.updateUnreadCount();

        this.toastr.info(newNotif.title);
    });
  }

  public addNotification(notification: AppNotification): void {
    this.notificationsSignal.set([notification, ...this.notificationsSignal()]);
    this.updateUnreadCount();
    this.toastr.info(notification.title);
  }

  public stopConnection(): void {
    this.hubConnection?.stop();
  }
}
