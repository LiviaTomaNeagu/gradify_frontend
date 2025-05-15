import { Injectable, Signal, inject, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppNotification } from './notification.interfaces';
import { NotificationTypeEnum } from 'src/app/shared/enums/notification-type.enum';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { add } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection!: signalR.HubConnection;
  private currentUserService = inject(CurrentUserService);
  private notificationsSignal = signal<AppNotification[]>([]);
  private unreadCountSignal = signal<number>(0);

  constructor(private toastr: ToastrService, private http: HttpClient) {}

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
            createdAt: new Date(),
            read: false,
            type: data.Type ?? NotificationTypeEnum.FORUM,
            route: route,
        };
        

        this.notificationsSignal.set([newNotif, ...this.notificationsSignal()]);
        this.getUnreadCountFromServer().subscribe(count => {
          this.unreadCountSignal.set(count);
        });

        this.toastr.info(newNotif.title);
    });
  }

  public addNotification(notification: AppNotification): void {
    this.addNotificationToDatabase(notification).subscribe(() => {
      this.notificationsSignal.set([notification, ...this.notificationsSignal()]);
      this.toastr.info(notification.title);
      this.unreadCountSignal.set(this.unreadCountSignal() + 1);
    });
    
  }

   addNotificationToDatabase(notification: AppNotification): Observable<void> {
    const currentUser = this.currentUserService.getCurrentUserInfo();
    const request = {
      title: notification.title,
      message: notification.message,
      type: notification.type,
      route: notification.route,
      userId: currentUser?.id,
    };
    return this.http.post<void>(`${environment.apiUrl}/notifications/create`, request);
  }

  getNotifcations(): Observable<AppNotification[]> {
    console.log("🔍 Fetching notifications from server");
    return this.http.get<AppNotification[]>(`${environment.apiUrl}/notifications/get-notifications`);
  }

  getUnreadCountFromServer(): Observable<number> {
  return this.http
    .get<{ totalUnread: number }>(`${environment.apiUrl}/notifications/unread-count`)
    .pipe(map(res => res.totalUnread));
}

  readNotification(notification: AppNotification): Observable<void> {
    this.markAsRead(notification.id!);
    this.unreadCountSignal.set(this.unreadCountSignal() - 1);
    return this.http.put<void>(`${environment.apiUrl}/notifications/read/${notification.id}`, {});
  }

  public markAsRead(notificationId: string): void {
  const updated = this.notificationsSignal().map(n => {
    if (n.id === notificationId && !n.read) {
      this.unreadCountSignal.set(this.unreadCountSignal() - 1);
      return { ...n, read: true };
    }
    return n;
  });
  this.notificationsSignal.set(updated);
}

public getUnreadCount(): void {
  this.getUnreadCountFromServer().subscribe(count => {
    this.unreadCountSignal.set(count);
    console.log("🔄 Unread count from server:", count);
  }
  );
}

  public stopConnection(): void {
    this.hubConnection?.stop();
  }
}
