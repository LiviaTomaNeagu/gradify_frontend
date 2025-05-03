
export interface CalendarEvent {
  id?: string;
  title: string;
  colorPrimary: string;
  start: Date;
  end: Date;
  coordinatorId: string;
}

export interface CalendarEventDTO {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  color: {
    primary: string;
    secondary: string;
  };
  coordinatorId: string;
}