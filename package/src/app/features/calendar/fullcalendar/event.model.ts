import { CalendarEventAction, CalendarEvent } from 'angular-calendar';
import {
  addDays,
  startOfDay,
} from 'date-fns';

export class EgretCalendarEvent implements CalendarEvent {
  // tslint:disable-next-line - Disables all
  _id?: string;
  start: Date;
  end: Date;
  title: string;
  color?: {
    primary: string;
    secondary: string;
  };
  actions?: CalendarEventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  meta?: {
    location: string;
    notes: string;
  };

  constructor(data: any) {
    data = data || {};
    this.start = new Date(data.start) || startOfDay(new Date());
    this.end = data.end ? addDays(new Date(data.end), 1) : addDays(startOfDay(new Date()), 1);
    this._id = data._id || '';
    this.title = data.title || '';
    this.color = {
      primary: (data.color && data.color.primary) || '#247ba0',
      secondary: (data.color && data.color.secondary) || '#D1E8FF',
    };
    this.draggable = data.draggable || true;
    this.resizable = {
      beforeStart: (data.resizable && data.resizable.beforeStart) || true,
      afterEnd: (data.resizable && data.resizable.afterEnd) || true,
    };
    this.actions = data.actions || [];
    this.allDay = true;
    this.cssClass = data.cssClass || '';
    this.meta = {
      location: (data.meta && data.meta.location) || '',
      notes: (data.meta && data.meta.notes) || '',
    };
  }
}
