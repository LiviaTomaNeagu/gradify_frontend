import { NotificationTypeEnum } from "src/app/shared/enums/notification-type.enum";

export interface AppNotification {
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    type: NotificationTypeEnum;
    route?: string;
  }
  