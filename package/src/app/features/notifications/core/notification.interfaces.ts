import { NotificationTypeEnum } from "src/app/shared/enums/notification-type.enum";

export interface AppNotification {
    id?: string;
    title: string;
    message: string;
    createdAt: Date;
    read: boolean;
    type: NotificationTypeEnum;
    route?: string;
  }

  export interface CreateNotificationRequest {
    title: string;
    message: string;
    type: NotificationTypeEnum;
    route?: string;
  }
  