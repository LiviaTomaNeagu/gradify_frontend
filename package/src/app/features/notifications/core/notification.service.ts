import { Injectable, Signal, inject, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppNotification } from './notification.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection!: signalR.HubConnection;
  private currentUserService = inject(CurrentUserService);
  private notificationsSignal = signal<AppNotification[]>([]);

  constructor(private toastr: ToastrService) {}

  public notifications(): Signal<AppNotification[]> {
    return this.notificationsSignal.asReadonly();
  }

  // 🔘 Marchează toate ca citite
  public markAllAsRead(): void {
    const updated = this.notificationsSignal().map(n => ({ ...n, read: true }));
    this.notificationsSignal.set(updated);
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
      console.log("Notification received:", data);
      const newNotif: AppNotification = {
        title: data.Title,
        message: data.Message,
        timestamp: new Date(),
        read: false
      };

      this.notificationsSignal.set([newNotif, ...this.notificationsSignal()]);

      this.toastr.info(data.Message, data.Title);
    });
  }

  public stopConnection(): void {
    this.hubConnection?.stop();
  }
}
